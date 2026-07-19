import { NavLink } from "react-router-dom";
import {
    MessageSquare,
    Network,
    Activity,
    Settings,
    Trash2,
    BrainCircuit,
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
            {/* Logo */}
            <div
                className="flex items-center gap-3 px-5 py-5"
                style={{ borderBottom: "1px solid var(--border)" }}
            >
                <div
                    className="icon-box-lg"
                    style={{
                        background: "linear-gradient(135deg, #00d4a0, #0090ff)",
                        boxShadow: "0 4px 14px rgba(0,212,160,0.3)",
                    }}
                >
                    <BrainCircuit size={22} color="#fff" />
                </div>
                <div>
                    <p className="font-bold" style={{ fontSize: "15px", lineHeight: 1.2 }}>
                        Memory AI
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--secondary)", marginTop: "2px" }}>
                        v2.0 · Online
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="label px-2 mb-3">Main Menu</p>
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
                        <div className="flex-1 min-w-0">
                            <p
                                className="font-semibold truncate"
                                style={{ fontSize: "13px", lineHeight: 1.3 }}
                            >
                                {label}
                            </p>
                            <p
                                className="truncate"
                                style={{ fontSize: "11px", color: "var(--secondary)", marginTop: "1px" }}
                            >
                                {sub}
                            </p>
                        </div>
                        <ChevronRight size={14} style={{ color: "var(--secondary)", flexShrink: 0 }} />
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 pb-4" style={{ borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                {/* System status pill */}
                <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3"
                    style={{ background: "rgba(0,212,160,0.06)", border: "1px solid rgba(0,212,160,0.15)" }}
                >
                    <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
                    />
                    <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>
                        System Operational
                    </span>
                </div>

                <button
                    onClick={onClearConversation}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition"
                    style={{
                        background: "var(--danger-dim)",
                        border: "1px solid rgba(255,77,77,0.2)",
                        color: "var(--danger)",
                        fontSize: "13px",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,77,77,0.18)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--danger-dim)"}
                >
                    <Trash2 size={14} />
                    Clear Chat
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;