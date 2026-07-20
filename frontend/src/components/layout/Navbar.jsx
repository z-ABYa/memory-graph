import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Settings, Trash2, X, Sparkles, Info, Cpu } from "lucide-react";

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
                height: "56px",
                background: "var(--sidebar)",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "20px",
                paddingRight: "16px",
                flexShrink: 0,
                gap: "12px",
            }}
        >
            {/* Left — status badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 11px",
                        borderRadius: "8px",
                        background: "var(--card-2)",
                        border: "1px solid var(--border)",
                        fontSize: "11.5px",
                        color: "var(--text-2)",
                        fontWeight: 500,
                    }}
                >
                    <Cpu size={12} style={{ color: "var(--primary)" }} />
                    Gemini 2.5 Flash
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 11px",
                        borderRadius: "8px",
                        background: "var(--card-2)",
                        border: "1px solid var(--border)",
                        fontSize: "11.5px",
                        color: "var(--text-2)",
                        fontWeight: 500,
                    }}
                >
                    <Sparkles size={12} style={{ color: "#818cf8" }} />
                    Hybrid RAG · LangGraph
                </div>
            </div>

            {/* Right — action buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn-icon"
                    title={darkMode ? "Switch to Light" : "Switch to Dark"}
                >
                    {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>

                {/* Settings / more */}
                <div ref={menuRef} style={{ position: "relative" }}>
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="btn-icon"
                        title="Options"
                    >
                        {menuOpen ? <X size={14} /> : <Settings size={14} />}
                    </button>

                    {menuOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                right: 0,
                                width: "236px",
                                background: "var(--card)",
                                border: "1px solid var(--border-2)",
                                borderRadius: "14px",
                                boxShadow: "var(--shadow-lg)",
                                overflow: "hidden",
                                zIndex: 9999,
                                padding: "4px 0",
                            }}
                        >
                            {/* Switch theme */}
                            <button
                                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 16px",
                                    background: "none",
                                    border: "none",
                                    color: "var(--text)",
                                    fontSize: "12.5px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "var(--card-hover)"}
                                onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                                Switch Theme
                            </button>

                            {/* Clear conversation */}
                            <button
                                onClick={() => { clearConversation(); setMenuOpen(false); }}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 16px",
                                    background: "none",
                                    border: "none",
                                    color: "var(--danger)",
                                    fontSize: "12.5px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    fontFamily: "inherit",
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "var(--danger-dim)"}
                                onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                                <Trash2 size={14} />
                                Clear Conversation
                            </button>

                            <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />

                            {/* About */}
                            <div style={{ padding: "10px 16px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "7px",
                                        marginBottom: "6px",
                                    }}
                                >
                                    <Info size={12} style={{ color: "var(--primary)" }} />
                                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        About
                                    </span>
                                </div>
                                <p style={{ fontSize: "11.5px", color: "var(--secondary)", lineHeight: 1.65 }}>
                                    MemoryGraph combines Hybrid RAG, Long-Term Memory, Knowledge Graph &amp; LangGraph for context-aware AI responses.
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