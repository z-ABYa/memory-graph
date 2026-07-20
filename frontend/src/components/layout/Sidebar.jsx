import { NavLink } from "react-router-dom";
import {
    MessageSquare,
    Network,
    Activity,
    Settings,
    Trash2,
    ChevronRight,
} from "lucide-react";

const NAV = [
    { path: "/",           label: "Chat",            sub: "AI Workspace",          icon: MessageSquare, color: "#00d4a0" },
    { path: "/graph",      label: "Knowledge Graph", sub: "Entity Map",            icon: Network,       color: "#818cf8" },
    { path: "/evaluation", label: "Evaluation",      sub: "Performance Metrics",   icon: Activity,      color: "#fb923c" },
    { path: "/settings",   label: "Settings",        sub: "Configuration",         icon: Settings,      color: "#a78bfa" },
];

function Sidebar({ onClearConversation }) {
    return (
        <aside
            className="flex flex-col"
            style={{
                width: "260px",
                minWidth: "260px",
                background: "var(--sidebar)",
                borderRight: "1px solid var(--border)",
            }}
        >
            {/* Wordmark — no icon */}
            <div
                style={{
                    padding: "18px 20px",
                    borderBottom: "1px solid var(--border)",
                }}
            >
                <p
                    style={{
                        fontSize: "17px",
                        fontWeight: 800,
                        letterSpacing: "-0.5px",
                        background: "linear-gradient(135deg, #00d4a0, #0090ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: 1.2,
                    }}
                >
                    MemoryGraph
                </p>
                <p style={{ fontSize: "10.5px", color: "var(--secondary)", marginTop: "3px" }}>
                    v2.0 · Online
                </p>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
                <p className="label" style={{ padding: "0 8px", marginBottom: "8px" }}>Main Menu</p>
                {NAV.map(({ path, label, sub, icon: Icon, color }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/"}
                        className={({ isActive }) =>
                            `sidebar-nav-item ${isActive ? "active" : ""}`
                        }
                    >
                        <div
                            className="icon-box"
                            style={{
                                background: `${color}20`,
                                border: `1px solid ${color}30`,
                            }}
                        >
                            <Icon size={16} style={{ color }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {label}
                            </p>
                            <p
                                style={{
                                    fontSize: "11px",
                                    color: "var(--secondary)",
                                    marginTop: "1px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {sub}
                            </p>
                        </div>
                        <ChevronRight size={14} style={{ color: "var(--secondary)", flexShrink: 0 }} />
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div
                style={{
                    padding: "12px",
                    borderTop: "1px solid var(--border)",
                }}
            >
                {/* System status */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        marginBottom: "8px",
                        background: "rgba(0,212,160,0.05)",
                        border: "1px solid rgba(0,212,160,0.12)",
                    }}
                >
                    <span
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            boxShadow: "0 0 6px #22c55e",
                            flexShrink: 0,
                        }}
                    />
                    <span style={{ fontSize: "11.5px", color: "var(--primary)", fontWeight: 600 }}>
                        System Operational
                    </span>
                </div>

                <button
                    onClick={onClearConversation}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "7px",
                        padding: "9px 0",
                        borderRadius: "10px",
                        background: "var(--danger-dim)",
                        border: "1px solid rgba(255,77,77,0.18)",
                        color: "var(--danger)",
                        fontSize: "12.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,77,77,0.18)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--danger-dim)"}
                >
                    <Trash2 size={13} />
                    Clear Chat
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;