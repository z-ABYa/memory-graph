import { useEffect, useState } from "react";
import {
    Brain,
    Database,
    Network,
    Moon,
    Sun,
    RotateCcw,
    CheckCircle2,
    Save,
    ChevronDown,
    Info,
} from "lucide-react";
import { getAnalytics } from "../services/chatService";

function SettingCard({ icon: Icon, iconColor = "#10A37F", title, description, children }) {
    return (
        <div
            className="rounded-3xl border p-6"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
            <div className="flex items-center gap-4 mb-6">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: iconColor + "22", border: `1px solid ${iconColor}44` }}
                >
                    <Icon size={22} style={{ color: iconColor }} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-sm" style={{ color: "var(--secondary)" }}>
                        {description}
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}

function ReadOnlyField({ label, value }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--secondary)" }}>
                {label}
            </label>
            <div
                className="w-full rounded-xl px-4 py-3 flex justify-between items-center"
                style={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                }}
            >
                <span className="font-medium text-sm">{value}</span>
                <CheckCircle2 size={16} color="#22C55E" />
            </div>
        </div>
    );
}

function Settings() {
    const [theme, setTheme] = useState(() =>
        localStorage.getItem("theme") === "light" ? "light" : "dark"
    );
    const [saved, setSaved] = useState(false);
    const [analytics, setAnalytics] = useState(null);

    const [settings, setSettings] = useState(() => {
        try {
            const s = localStorage.getItem("memory-ai-settings");
            return s ? JSON.parse(s) : {
                llm: "Gemini 2.5 Flash",
                embedding: "all-MiniLM-L6-v2",
                vectorDB: "ChromaDB",
                graphDB: "NetworkX",
            };
        } catch {
            return {
                llm: "Gemini 2.5 Flash",
                embedding: "all-MiniLM-L6-v2",
                vectorDB: "ChromaDB",
                graphDB: "NetworkX",
            };
        }
    });

    // Sync theme state when toggled externally via Navbar
    useEffect(() => {
        const syncTheme = () => {
            const t = localStorage.getItem("theme") === "light" ? "light" : "dark";
            setTheme(t);
        };
        window.addEventListener("storage", syncTheme);
        return () => window.removeEventListener("storage", syncTheme);
    }, []);

    useEffect(() => {
        getAnalytics().then(setAnalytics).catch(() => {});
    }, []);

    function toggleTheme() {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
        if (next === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    }

    function saveSettings() {
        localStorage.setItem("memory-ai-settings", JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    function resetSettings() {
        const defaults = {
            llm: "Gemini 2.5 Flash",
            embedding: "all-MiniLM-L6-v2",
            vectorDB: "ChromaDB",
            graphDB: "NetworkX",
        };
        setSettings(defaults);
    }

    return (
        <div className="space-y-6 pb-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold">Settings</h1>
                <p className="mt-2" style={{ color: "var(--secondary)" }}>
                    Configure the MemoryGraph system components.
                </p>
            </div>

            {/* Live System Info Banner */}
            {analytics && (
                <div
                    className="rounded-2xl border p-4 flex flex-wrap gap-6"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                    <div className="flex items-center gap-2">
                        <Info size={16} color="#10A37F" />
                        <span className="text-sm font-semibold">System Snapshot:</span>
                    </div>
                    <span className="text-sm" style={{ color: "var(--secondary)" }}>
                        <strong style={{ color: "var(--text)" }}>{analytics.documents}</strong> documents ingested
                    </span>
                    <span className="text-sm" style={{ color: "var(--secondary)" }}>
                        <strong style={{ color: "var(--text)" }}>{analytics.chunks}</strong> vector chunks
                    </span>
                    <span className="text-sm" style={{ color: "var(--secondary)" }}>
                        <strong style={{ color: "var(--text)" }}>{analytics.memory}</strong> long-term memories
                    </span>
                    <span className="text-sm" style={{ color: "var(--secondary)" }}>
                        <strong style={{ color: "var(--text)" }}>{analytics.nodes}</strong> graph nodes
                    </span>
                </div>
            )}

            {/* Language Model */}
            <SettingCard
                icon={Brain}
                iconColor="#EC4899"
                title="Language Model"
                description="The LLM powering generation and entity extraction"
            >
                <ReadOnlyField label="Active Model" value={settings.llm} />
            </SettingCard>

            {/* Embeddings */}
            <SettingCard
                icon={Database}
                iconColor="#3B82F6"
                title="Embeddings & Vector Store"
                description="Semantic embedding model and vector database"
            >
                <div className="grid grid-cols-2 gap-4">
                    <ReadOnlyField label="Embedding Model" value={settings.embedding} />
                    <ReadOnlyField label="Vector Database" value={settings.vectorDB} />
                </div>
            </SettingCard>

            {/* Knowledge Graph */}
            <SettingCard
                icon={Network}
                iconColor="#10B981"
                title="Knowledge Graph"
                description="Graph storage backend for entity relationships"
            >
                <ReadOnlyField label="Graph Backend" value={settings.graphDB} />
            </SettingCard>

            {/* Appearance */}
            <SettingCard
                icon={theme === "dark" ? Moon : Sun}
                iconColor="#F59E0B"
                title="Appearance"
                description="Switch between dark and light themes"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition hover:opacity-90 active:scale-95"
                        style={{ background: "#F59E0B22", border: "1px solid #F59E0B44", color: "#F59E0B" }}
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        Switch to {theme === "dark" ? "Light" : "Dark"} Theme
                    </button>
                    <span className="text-sm" style={{ color: "var(--secondary)" }}>
                        Currently: <strong style={{ color: "var(--text)" }}>{theme === "dark" ? "Dark" : "Light"} Mode</strong>
                    </span>
                </div>
            </SettingCard>

            {/* Action Buttons */}
            <div className="flex gap-4 items-center">
                <button
                    onClick={saveSettings}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition hover:opacity-90 active:scale-95"
                    style={{ background: "#10A37F", color: "#fff" }}
                >
                    <Save size={18} />
                    Save Settings
                </button>
                <button
                    onClick={resetSettings}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition hover:opacity-90 active:scale-95"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--secondary)" }}
                >
                    <RotateCcw size={18} />
                    Reset to Defaults
                </button>

                {saved && (
                    <div className="flex items-center gap-2 text-sm ml-auto animate-pulse">
                        <CheckCircle2 size={18} color="#22C55E" />
                        <span style={{ color: "#22C55E" }}>Saved successfully!</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;