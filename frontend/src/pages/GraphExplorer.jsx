import { useEffect, useRef, useState } from "react";
import { Network, RefreshCcw, Search, Info, HelpCircle } from "lucide-react";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

function GraphExplorer() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [graphData, setGraphData] = useState({ nodes: [], relationships: [] });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedNode, setSelectedNode] = useState(null);
    const [hoveredNode, setHoveredNode] = useState(null);

    // Keep simulation coordinates in a mutable ref to prevent React re-renders on animation frames
    const simRef = useRef({
        nodes: [],
        edges: [],
        draggedNode: null,
        width: 800,
        height: 600,
        mouse: { x: 0, y: 0 },
        alpha: 1.0 // Add cooling factor (alpha) to stabilize graph
    });

    // Fetch graph data from backend
    async function fetchGraph() {
        setLoading(true);
        setSelectedNode(null);
        try {
            const { data } = await API.get("/graph/");
            setGraphData(data);
            
            // Reset alpha so the graph relaxes from a fresh state
            simRef.current.alpha = 1.0;
            
            // Initialize simulation objects
            const nodes = data.nodes.map((n, i) => {
                const angle = (i / data.nodes.length) * Math.PI * 2;
                const radius = 180;
                return {
                    ...n,
                    x: 400 + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
                    y: 300 + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
                    vx: 0,
                    vy: 0,
                    radius: n.type === "USER" ? 22 : 14,
                    color: getColorForType(n.type)
                };
            });

            // Map edges to refer directly to node objects
            const edges = data.relationships.map((rel) => {
                const sourceNode = nodes.find(n => n.id === rel.source);
                const targetNode = nodes.find(n => n.id === rel.target);
                return {
                    ...rel,
                    source: sourceNode,
                    target: targetNode
                };
            }).filter(e => e.source && e.target);

            simRef.current.nodes = nodes;
            simRef.current.edges = edges;
        } catch (error) {
            console.error("Error fetching graph data:", error);
        } finally {
            setLoading(false);
        }
    }

    function getColorForType(type) {
        switch (type?.toUpperCase()) {
            case "USER": return "#10A37F"; // Green
            case "PERSONAL": return "#EC4899"; // Pink
            case "PREFERENCE": return "#F59E0B"; // Amber
            case "LOCATION": return "#3B82F6"; // Blue
            case "EDUCATION": return "#8B5CF6"; // Purple
            default: return "#10B981"; // Emerald
        }
    }

    useEffect(() => {
        fetchGraph();
    }, []);

    // Canvas rendering & Force-directed simulation loop
    useEffect(() => {
        if (loading || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Fit canvas to parent container
        const resizeCanvas = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                canvas.width = rect.width * window.devicePixelRatio;
                canvas.height = rect.height * window.devicePixelRatio;
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                simRef.current.width = rect.width;
                simRef.current.height = rect.height;
            }
        };
        
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const simulate = () => {
            const { nodes, edges, width, height, draggedNode, alpha } = simRef.current;
            
            // If the simulation has cooled down completely, skip physics updates to save resources
            if (alpha < 0.005) return;

            const kRepel = 240; // Repulsion force constant
            const kAttract = 0.05; // Attraction force constant
            const centerStrength = 0.04;
            const damping = 0.8;

            // 1. Repulsion force between all node pairs
            for (let i = 0; i < nodes.length; i++) {
                const n1 = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    
                    // Add a softening parameter (+ 400) to prevent divide-by-zero or force explosion
                    const distSq = dx * dx + dy * dy + 400;
                    const dist = Math.sqrt(distSq);

                    // Pushes apart
                    if (dist < 280) {
                        const force = (kRepel * 100) / distSq;
                        const fx = (dx / dist) * force;
                        const fy = (dy / dist) * force;

                        n1.vx -= fx * alpha;
                        n1.vy -= fy * alpha;
                        n2.vx += fx * alpha;
                        n2.vy += fy * alpha;
                    }
                }
            }

            // 2. Attraction force along edges
            for (const edge of edges) {
                const n1 = edge.source;
                const n2 = edge.target;
                const dx = n2.x - n1.x;
                const dy = n2.y - n1.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                
                // Pulls together (rest length is ~130)
                const restLength = 130;
                const force = (dist - restLength) * kAttract;
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;

                n1.vx += fx * alpha;
                n1.vy += fy * alpha;
                n2.vx -= fx * alpha;
                n2.vy -= fy * alpha;
            }

            // 3. Center gravity force
            const cx = width / 2;
            const cy = height / 2;
            for (const node of nodes) {
                node.vx += (cx - node.x) * centerStrength * alpha;
                node.vy += (cy - node.y) * centerStrength * alpha;
            }

            // 4. Update coordinates & apply damping
            for (const node of nodes) {
                if (node === draggedNode) {
                    // Locked to mouse position
                    node.x = simRef.current.mouse.x;
                    node.y = simRef.current.mouse.y;
                    node.vx = 0;
                    node.vy = 0;
                } else {
                    node.x += node.vx;
                    node.y += node.vy;
                    node.vx *= damping;
                    node.vy *= damping;

                    // Bound constraints
                    node.x = Math.max(30, Math.min(width - 30, node.x));
                    node.y = Math.max(30, Math.min(height - 30, node.y));
                }
            }

            // Decay alpha (cooling down)
            simRef.current.alpha *= 0.985;
        };

        const render = () => {
            const { nodes, edges, width, height } = simRef.current;
            ctx.clearRect(0, 0, width, height);

            // Determine if theme is light
            const isLight = document.documentElement.classList.contains("light");

            // Draw grid lines in the background
            ctx.strokeStyle = isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)";
            ctx.lineWidth = 1;
            const gridSize = 40;
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw Edges (Relationships)
            ctx.lineWidth = 2;
            for (const edge of edges) {
                const isSelected = selectedNode && (selectedNode.id === edge.source.id || selectedNode.id === edge.target.id);
                const isHovered = hoveredNode && (hoveredNode.id === edge.source.id || hoveredNode.id === edge.target.id);
                
                ctx.strokeStyle = isSelected 
                    ? "#10A37F" 
                    : isHovered 
                        ? "rgba(16, 163, 127, 0.6)" 
                        : isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
                
                ctx.beginPath();
                ctx.moveTo(edge.source.x, edge.source.y);
                ctx.lineTo(edge.target.x, edge.target.y);
                ctx.stroke();

                // Draw edge labels
                const mx = (edge.source.x + edge.target.x) / 2;
                const my = (edge.source.y + edge.target.y) / 2;
                ctx.save();
                ctx.translate(mx, my);
                
                // Align text rotation with the edge line
                let angle = Math.atan2(edge.target.y - edge.source.y, edge.target.x - edge.source.x);
                if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI; // Keep text upright
                ctx.rotate(angle);
                
                ctx.fillStyle = isLight ? "rgba(0, 0, 0, 0.45)" : "rgba(255, 255, 255, 0.45)";
                ctx.font = "bold 9px system-ui, sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.fillText(edge.type, 0, -2);
                ctx.restore();
            }

            // Draw Nodes
            for (const node of nodes) {
                const isSelected = selectedNode && selectedNode.id === node.id;
                const isHovered = hoveredNode && hoveredNode.id === node.id;
                const isSearched = searchQuery && node.label.toLowerCase().includes(searchQuery.toLowerCase());

                // Glowing outer ring for selected/searched nodes
                if (isSelected || isSearched) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = node.color;
                } else if (isHovered) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = node.color;
                } else {
                    ctx.shadowBlur = 0;
                }

                // Draw Node Body
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                // Reset shadows
                ctx.shadowBlur = 0;

                // Draw outer ring
                ctx.strokeStyle = isLight ? "#ffffff" : "#171717";
                ctx.lineWidth = 2.5;
                ctx.stroke();

                // Draw Node Label Text
                ctx.fillStyle = isLight ? "#111827" : "#f3f4f6";
                ctx.font = isSelected ? "bold 12px system-ui, sans-serif" : "500 11px system-ui, sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(node.label || node.id, node.x, node.y + node.radius + 5);

                // Draw small type tag
                ctx.fillStyle = isLight ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.4)";
                ctx.font = "400 9px system-ui, sans-serif";
                ctx.fillText(node.type || "", node.x, node.y + node.radius + 18);
            }
        };

        const tick = () => {
            simulate();
            render();
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [loading, selectedNode, hoveredNode, searchQuery]);

    // Handle mouse event handlers
    function handleMouseDown(e) {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Wake up simulation when interacting
        simRef.current.alpha = 1.0;

        // Check if a node was clicked
        const clickedNode = simRef.current.nodes.find(node => {
            const dx = node.x - mx;
            const dy = node.y - my;
            return Math.sqrt(dx * dx + dy * dy) <= node.radius + 6;
        });

        if (clickedNode) {
            simRef.current.draggedNode = clickedNode;
            setSelectedNode(clickedNode);
        } else {
            setSelectedNode(null);
        }
    }

    function handleMouseMove(e) {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        simRef.current.mouse.x = mx;
        simRef.current.mouse.y = my;

        if (simRef.current.draggedNode) {
            // Keep simulation hot while dragging
            simRef.current.alpha = 1.0;
        }

        // Check if hovering a node
        const node = simRef.current.nodes.find(node => {
            const dx = node.x - mx;
            const dy = node.y - my;
            return Math.sqrt(dx * dx + dy * dy) <= node.radius + 6;
        });

        setHoveredNode(node || null);
        canvasRef.current.style.cursor = node ? "pointer" : "default";
    }

    function handleMouseUp() {
        simRef.current.draggedNode = null;
    }

    // Get relationships associated with the selected node
    const activeRelations = selectedNode
        ? graphData.relationships.filter(
              (r) => r.source === selectedNode.id || r.target === selectedNode.id
          )
        : [];

    return (
        <div className="grid grid-cols-12 gap-6 h-full min-h-0">
            {/* Graph Visualizer Canvas Area */}
            <div
                className="col-span-8 rounded-3xl border flex flex-col overflow-hidden shadow-card relative"
                style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                }}
            >
                {/* Header Toolbar */}
                <div
                    className="p-5 border-b flex justify-between items-center z-10"
                    style={{
                        borderColor: "var(--border)",
                        background: "rgba(30, 30, 30, 0.4)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <Network size={22} color="#10A37F" />
                        <div>
                            <h2 className="text-lg font-bold">Knowledge Graph Map</h2>
                            <p
                                className="text-xs"
                                style={{ color: "var(--secondary)" }}
                            >
                                Drag nodes, click to expand, search entities
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-64">
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                                style={{ color: "var(--secondary)" }}
                            />
                            <input
                                type="text"
                                placeholder="Search entities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition"
                                style={{
                                    background: "var(--bg)",
                                    border: "1px solid var(--border)",
                                }}
                            />
                        </div>
                        <button
                            onClick={fetchGraph}
                            disabled={loading}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition"
                            style={{
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                {/* Canvas Container */}
                <div ref={containerRef} className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--card)] z-20">
                            <LoadingSpinner text="Retrieving Graph Store..." />
                        </div>
                    ) : graphData.nodes.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[var(--card)] z-20">
                            <HelpCircle size={48} className="text-[var(--secondary)] mb-4" />
                            <h3 className="text-xl font-bold">No Entities Extracted</h3>
                            <p className="max-w-md text-sm mt-2" style={{ color: "var(--secondary)" }}>
                                Graph relationships populate automatically as you ingest PDFs, scrape websites, or chat.
                            </p>
                        </div>
                    ) : null}
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="block w-full h-full"
                    />
                </div>
            </div>

            {/* Entity Detail Sidebar Panel */}
            <div className="col-span-4 flex flex-col space-y-6 min-h-0">
                {/* Visual Legend */}
                <div
                    className="rounded-3xl border p-5 flex flex-col"
                    style={{
                        background: "var(--card)",
                        borderColor: "var(--border)",
                    }}
                >
                    <h3 className="font-bold text-sm mb-3">Entity Legend</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#10A37F" }} />
                            <span>User Node</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#EC4899" }} />
                            <span>Personal Fact</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#F59E0B" }} />
                            <span>User Preference</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#3B82F6" }} />
                            <span>Location</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs col-span-2">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#8B5CF6" }} />
                            <span>Education / Work Entity</span>
                        </div>
                    </div>
                </div>

                {/* Selected Node Details Card */}
                <div
                    className="rounded-3xl border p-5 flex-1 flex flex-col min-h-0 overflow-hidden"
                    style={{
                        background: "var(--card)",
                        borderColor: "var(--border)",
                    }}
                >
                    {selectedNode ? (
                        <div className="flex flex-col h-full min-h-0">
                            {/* Selected Info Header */}
                            <div className="pb-4 border-b mb-4" style={{ borderColor: "var(--border)" }}>
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-4 h-4 rounded-full flex-shrink-0"
                                        style={{ background: selectedNode.color }}
                                    />
                                    <div>
                                        <h4 className="font-bold text-lg leading-tight truncate max-w-[220px]">
                                            {selectedNode.label}
                                        </h4>
                                        <span className="text-xs uppercase tracking-wider font-semibold opacity-60">
                                            Type: {selectedNode.type}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Connected Relationships List */}
                            <h4 className="font-bold text-sm mb-3">Relations Map ({activeRelations.length})</h4>
                            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                                {activeRelations.length === 0 ? (
                                    <p className="text-xs opacity-60">No edges connected to this node.</p>
                                ) : (
                                    activeRelations.map((rel, i) => (
                                        <div
                                            key={i}
                                            className="rounded-2xl p-3.5 border transition hover:scale-[1.01]"
                                            style={{
                                                background: "var(--bg)",
                                                borderColor: "var(--border)",
                                            }}
                                        >
                                            <span className="text-xs font-bold text-[#10A37F] block uppercase mb-1">
                                                {rel.type}
                                            </span>
                                            <div className="text-sm flex flex-wrap items-center gap-1 text-[var(--secondary)]">
                                                <strong style={{ color: "var(--text)" }}>{rel.source}</strong>
                                                <span>→</span>
                                                <strong style={{ color: "var(--text)" }}>{rel.target}</strong>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[var(--secondary)]">
                            <Info size={32} className="mb-3 opacity-60" />
                            <h4 className="font-bold">No Node Selected</h4>
                            <p className="text-xs mt-2 max-w-[200px]">
                                Click any node on the graph map to view its active relationships.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GraphExplorer;
