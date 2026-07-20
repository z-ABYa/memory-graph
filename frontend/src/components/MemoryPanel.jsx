import { Brain, Clock3, ChevronDown, ChevronUp, Sparkles, Database } from "lucide-react";
import { useState } from "react";

function MemoryCard({ memory }) {
    const [expanded, setExpanded] = useState(false);

    const title =
        memory?.title || memory?.key || "Retrieved Memory";

    const content =
        memory?.content ||
        memory?.text ||
        memory?.value ||
        (typeof memory === "string" ? memory : JSON.stringify(memory, null, 2));

    const timestamp = memory?.timestamp || "Current Session";
    const score = memory?.score;

    return (
        <div
            style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "12px",
                transition: "border-color 0.2s",
            }}
        >
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                    className="icon-box"
                    style={{
                        background: "rgba(244,114,182,0.12)",
                        border: "1px solid rgba(244,114,182,0.2)",
                        flexShrink: 0,
                        width: "32px",
                        height: "32px",
                        borderRadius: "9px",
                    }}
                >
                    <Brain size={14} style={{ color: "#f472b6" }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                        style={{
                            fontSize: "12.5px",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {title}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            marginTop: "3px",
                            fontSize: "10.5px",
                            color: "var(--secondary)",
                        }}
                    >
                        <Clock3 size={10} />
                        <span>{timestamp}</span>
                    </div>
                </div>

                <button
                    onClick={() => setExpanded(e => !e)}
                    style={{
                        background: "none",
                        border: "none",
                        padding: "2px",
                        color: "var(--secondary)",
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                >
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>

            {/* Content */}
            <p
                style={{
                    marginTop: "10px",
                    fontSize: "12.5px",
                    color: "var(--text-2)",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: expanded ? "unset" : 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {content}
            </p>

            {/* Similarity bar */}
            {score !== undefined && (
                <div style={{ marginTop: "10px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "10.5px",
                            color: "var(--secondary)",
                            marginBottom: "5px",
                        }}
                    >
                        <span>Similarity</span>
                        <span style={{ color: "var(--primary)", fontWeight: 600 }}>
                            {(score * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div
                        style={{
                            height: "3px",
                            borderRadius: "999px",
                            background: "var(--border)",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${score * 100}%`,
                                background: "linear-gradient(90deg, #00d4a0, #34d399)",
                                borderRadius: "999px",
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function MemoryPanel({ memories = [], loading = false }) {
    return (
        <div
            className="glass-card"
            style={{ padding: "16px" }}
        >
            {/* Header */}
            <div className="panel-header" style={{ paddingBottom: "10px", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                        className="icon-box"
                        style={{
                            background: "rgba(244,114,182,0.12)",
                            border: "1px solid rgba(244,114,182,0.2)",
                        }}
                    >
                        <Database size={15} style={{ color: "#f472b6" }} />
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: 700 }}>Long-Term Memory</p>
                        <p className="label" style={{ marginTop: "1px" }}>Retrieved for this query</p>
                    </div>
                </div>
                <span
                    className="badge badge-primary"
                    style={{
                        background: "rgba(244,114,182,0.12)",
                        color: "#f472b6",
                    }}
                >
                    <Sparkles size={10} />
                    {memories.length}
                </span>
            </div>

            {loading && (
                <p
                    style={{
                        textAlign: "center",
                        padding: "16px 0",
                        fontSize: "12px",
                        color: "var(--secondary)",
                    }}
                >
                    Loading memories…
                </p>
            )}

            {!loading && memories.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "18px 0",
                        fontSize: "12px",
                        color: "var(--secondary)",
                        lineHeight: 1.6,
                    }}
                >
                    No memories retrieved<br />for this query yet.
                </div>
            )}

            {memories.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {memories.map((memory, i) => (
                        <MemoryCard key={memory?.id || i} memory={memory} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MemoryPanel;