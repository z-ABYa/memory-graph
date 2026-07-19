import { FileText, Boxes, BrainCircuit, Network, Database, CheckCircle2, Zap } from "lucide-react";

const STATUS_ITEMS = [
    { key: "source",       label: "Document",       icon: FileText,    color: "#0090ff" },
    { key: "chunks",       label: "Chunks",         icon: Boxes,       color: "#818cf8" },
    { key: "embeddings",   label: "Embeddings",     icon: BrainCircuit,color: "#f472b6" },
    { key: "graph_status", label: "Graph",          icon: Network,     color: "#fb923c" },
    { key: "vector_store", label: "Vector Store",   icon: Database,    color: "#00d4a0" },
];

function PipelineStatus({ uploadStats }) {
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
                        style={{ background: "rgba(0,212,160,0.12)", border: "1px solid rgba(0,212,160,0.2)" }}
                    >
                        <Zap size={15} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: 700 }}>Pipeline Status</p>
                        <p className="label" style={{ marginTop: "1px" }}>Ingestion Info</p>
                    </div>
                </div>
                {uploadStats && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "var(--primary)",
                        }}
                    >
                        <CheckCircle2 size={12} />
                        Done
                    </div>
                )}
            </div>

            {!uploadStats ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "18px 0",
                        fontSize: "12px",
                        color: "var(--secondary)",
                        lineHeight: 1.6,
                    }}
                >
                    Upload a PDF or scrape a website<br />to view ingestion statistics.
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {STATUS_ITEMS.map(({ key, label, icon: Icon, color }) => (
                        <div
                            key={key}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "7px 10px",
                                borderRadius: "10px",
                                background: "var(--bg)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <Icon size={13} style={{ color, flexShrink: 0 }} />
                            <span style={{ flex: 1, fontSize: "12px", color: "var(--text-2)", fontWeight: 500 }}>
                                {label}
                            </span>
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    color: "var(--text)",
                                    maxWidth: "110px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    textAlign: "right",
                                }}
                                title={String(uploadStats[key] ?? "—")}
                            >
                                {uploadStats[key] ?? "—"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PipelineStatus;