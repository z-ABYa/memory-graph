import { useRef, useState } from "react";
import {
    Upload,
    Globe,
    Brain,
    Network,
    CheckCircle2,
    Loader2,
    X,
    AlertCircle,
    CheckCheck,
    Database,
} from "lucide-react";
import { scrapeWebsite, uploadDocument } from "../services/chatService";

function Toast({ type, message, onClose }) {
    const isSuccess = type === "success";
    return (
        <div
            className="slide-up"
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "12px",
                marginTop: "10px",
                background: isSuccess ? "rgba(0,212,160,0.08)" : "rgba(255,77,77,0.08)",
                border: `1px solid ${isSuccess ? "rgba(0,212,160,0.25)" : "rgba(255,77,77,0.25)"}`,
            }}
        >
            {isSuccess
                ? <CheckCheck size={14} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "1px" }} />
                : <AlertCircle size={14} style={{ color: "var(--danger)", flexShrink: 0, marginTop: "1px" }} />
            }
            <p style={{ flex: 1, fontSize: "12px", color: "var(--text-2)", lineHeight: 1.5 }}>
                {message}
            </p>
            <button onClick={onClose} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                <X size={13} style={{ color: "var(--secondary)" }} />
            </button>
        </div>
    );
}

function ScrapeModal({ onClose, onSuccess }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleScrape() {
        const trimmed = url.trim();
        if (!trimmed) { setError("Please enter a URL."); return; }
        if (!/^https?:\/\/.+/.test(trimmed)) { setError("URL must start with http:// or https://"); return; }
        setError("");
        setLoading(true);
        try {
            const data = await scrapeWebsite(trimmed);
            onSuccess(data);
            onClose();
        } catch (err) {
            setError(err?.detail || "Scraping failed. Try another URL.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="slide-up"
            style={{
                marginTop: "8px",
                padding: "12px",
                borderRadius: "12px",
                background: "var(--bg)",
                border: "1px solid rgba(0,212,160,0.25)",
            }}
        >
            <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)", marginBottom: "8px" }}>
                Enter website URL to scrape
            </p>
            <input
                autoFocus
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleScrape(); if (e.key === "Escape") onClose(); }}
                placeholder="https://example.com"
                className="input-field"
                style={{ marginBottom: error ? "6px" : "10px" }}
            />
            {error && (
                <p style={{ fontSize: "11px", color: "var(--danger)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                    <AlertCircle size={11} /> {error}
                </p>
            )}
            <div style={{ display: "flex", gap: "8px" }}>
                <button
                    onClick={handleScrape}
                    disabled={loading}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", fontSize: "12px", padding: "7px 0" }}
                >
                    {loading ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Scraping…</> : "Scrape Site"}
                </button>
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="btn-ghost"
                    style={{ fontSize: "12px", padding: "7px 14px" }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

const TOOLS = [
    { id: "pdf",    icon: Upload,  label: "Upload PDF",      sub: "Ingest into knowledge base",  color: "#0090ff" },
    { id: "scrape", icon: Globe,   label: "Scrape Website",  sub: "Extract web content",         color: "#00d4a0" },
    { id: "memory", icon: Brain,   label: "Long-Term Memory",sub: "Persistent across sessions",  color: "#f472b6", disabled: true },
    { id: "graph",  icon: Network, label: "Knowledge Graph", sub: "Entity extraction active",    color: "#818cf8", disabled: true },
];

function ToolPanel({ backendStatus = "online", onUploadSuccess }) {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [showScrape, setShowScrape] = useState(false);
    const [toast, setToast] = useState(null);

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        e.target.value = "";
        if (!file.name.toLowerCase().endsWith(".pdf")) {
            setToast({ type: "error", message: "Only PDF files are supported." });
            return;
        }
        setUploading(true);
        setToast(null);
        try {
            const data = await uploadDocument(file);
            setToast({
                type: "success",
                message: `"${file.name}" — ${data?.data?.chunks ?? "?"} chunks added to knowledge base.`,
            });
            onUploadSuccess?.(data?.data);
        } catch (err) {
            setToast({ type: "error", message: err?.detail || "Upload failed. Please try again." });
        } finally {
            setUploading(false);
        }
    }

    function handleScrapeSuccess(data) {
        setToast({ type: "success", message: `Website scraped — ${data?.data?.chunks ?? "?"} chunks added.` });
        onUploadSuccess?.(data?.data);
    }

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
                        style={{ background: "rgba(0,144,255,0.15)", border: "1px solid rgba(0,144,255,0.2)" }}
                    >
                        <Database size={15} style={{ color: "#0090ff" }} />
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: 700 }}>AI Tools</p>
                        <p className="label" style={{ marginTop: "1px" }}>Knowledge Sources</p>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: backendStatus === "online" ? "var(--primary)" : "var(--danger)",
                    }}
                >
                    <span
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: backendStatus === "online" ? "#22c55e" : "var(--danger)",
                            boxShadow: backendStatus === "online" ? "0 0 5px #22c55e" : "none",
                        }}
                    />
                    {backendStatus === "online" ? "Connected" : "Offline"}
                </div>
            </div>

            {/* Hidden file input */}
            <input ref={fileRef} type="file" hidden accept=".pdf" onChange={handleFileChange} />

            {/* Tool grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {TOOLS.map(({ id, icon: Icon, label, sub, color, disabled }) => (
                    <div key={id}>
                        <button
                            onClick={() => {
                                if (disabled) return;
                                if (id === "pdf") fileRef.current?.click();
                                if (id === "scrape") setShowScrape(v => !v);
                            }}
                            disabled={disabled || (id === "pdf" && uploading)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "12px",
                                background: "var(--bg)",
                                border: `1px solid ${showScrape && id === "scrape" ? `${color}40` : "var(--border)"}`,
                                cursor: disabled ? "default" : "pointer",
                                textAlign: "left",
                                opacity: disabled ? 0.55 : 1,
                                transition: "all 0.2s",
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                            }}
                            onMouseEnter={e => {
                                if (!disabled) {
                                    e.currentTarget.style.background = "var(--card-hover)";
                                    e.currentTarget.style.borderColor = `${color}40`;
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }
                            }}
                            onMouseLeave={e => {
                                if (!disabled) {
                                    e.currentTarget.style.background = "var(--bg)";
                                    e.currentTarget.style.borderColor = showScrape && id === "scrape" ? `${color}40` : "var(--border)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }
                            }}
                        >
                            <div
                                className="icon-box"
                                style={{
                                    background: `${color}18`,
                                    border: `1px solid ${color}28`,
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "9px",
                                }}
                            >
                                {id === "pdf" && uploading
                                    ? <Loader2 size={14} style={{ color, animation: "spin 1s linear infinite" }} />
                                    : <Icon size={14} style={{ color }} />
                                }
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.2 }}>{label}</p>
                                <p style={{ fontSize: "10.5px", color: "var(--secondary)", marginTop: "2px" }}>{sub}</p>
                            </div>
                        </button>

                        {id === "scrape" && showScrape && (
                            <ScrapeModal
                                onClose={() => setShowScrape(false)}
                                onSuccess={handleScrapeSuccess}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Toast */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default ToolPanel;