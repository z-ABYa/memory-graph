import { useEffect, useRef, useState } from "react";
import {
    Sun,
    Moon,
    Settings,
    Trash2,
    X,
    Sparkles,
    Info,
    Cpu,
} from "lucide-react";

function Navbar({ darkMode, toggleTheme, clearConversation }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handler(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header
            style={{
                height: "60px",
                background: "var(--sidebar)",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "20px",
                paddingRight: "20px",
                flexShrink: 0,
            }}
        >
            {/* Left — Status strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Gemini model badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        background: "var(--card-2)",
                        border: "1px solid var(--border)",
                        fontSize: "12px",
                        color: "var(--text-2)",
                        fontWeight: 500,
                    }}
                >
                    <Cpu size={13} style={{ color: "var(--primary)" }} />
                    Gemini 2.5 Flash
                </div>

                {/* RAG badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        background: "var(--card-2)",
                        border: "1px solid var(--border)",
                        fontSize: "12px",
                        color: "var(--text-2)",
                        fontWeight: 500,
                    }}
                >
                    <Sparkles size={13} style={{ color: "#818cf8" }} />
                    Hybrid RAG · LangGraph
                </div>
            </div>

            {/* Right — Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn-icon"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                {/* Settings menu */}
                <div ref={menuRef} style={{ position: "relative" }}>
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="btn-icon"
                        title="Options"
                    >
                        {menuOpen ? <X size={15} /> : <Settings size={15} />}
                    </button>

                    {menuOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                right: 0,
                                width: "240px",
                                background: "var(--card)",
                                border: "1px solid var(--border-2)",
                                borderRadius: "14px",
                                boxShadow: "var(--shadow-lg)",
                                overflow: "hidden",
                                zIndex: 9999,
                            }}
                        >
                            <button
                                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "12px 16px",
                                    background: "none",
                                    border: "none",
                                    color: "var(--text)",
                                    fontSize: "13px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "var(--card-hover)"}
                                onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                                Switch Theme
                            </button>

                            <button
                                onClick={() => { clearConversation(); setMenuOpen(false); }}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "12px 16px",
                                    background: "none",
                                    border: "none",
                                    color: "var(--danger)",
                                    fontSize: "13px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "var(--danger-dim)"}
                                onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                                <Trash2 size={15} />
                                Clear Conversation
                            </button>

                            <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />

                            <div style={{ padding: "12px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                                    <Info size={14} style={{ color: "var(--primary)" }} />
                                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-2)" }}>
                                        About
                                    </span>
                                </div>
                                <p style={{ fontSize: "11.5px", color: "var(--secondary)", lineHeight: 1.6 }}>
                                    Memory AI combines Hybrid RAG, Long-Term Memory, Knowledge Graph, and LangGraph for context-aware AI.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;