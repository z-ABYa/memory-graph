import { FileText, Globe, ExternalLink, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";

function SourceCard({ source }) {
    const [expanded, setExpanded] = useState(false);

    const title =
        source?.title || source?.name || source?.document ||
        source?.source || "Retrieved Source";

    const content =
        source?.content || source?.text ||
        source?.page_content || source?.chunk ||
        (typeof source === "string" ? source : "");

    const url      = source?.url || source?.link || "";
    const score    = source?.score;
    const chunk    = source?.chunk_index ?? source?.chunk;
    const document = source?.document || source?.source;
    const isUrl    = !!url || source?.type === "web";
    const accent   = isUrl ? "#00d4a0" : "#0090ff";

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
                        background: `${accent}18`,
                        border: `1px solid ${accent}28`,
                        flexShrink: 0,
                        width: "32px",
                        height: "32px",
                        borderRadius: "9px",
                    }}
                >
                    {isUrl
                        ? <Globe size={14} style={{ color: accent }} />
                        : <FileText size={14} style={{ color: accent }} />
                    }
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
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px",
                                marginTop: "3px",
                                fontSize: "10.5px",
                                color: "var(--primary)",
                                fontWeight: 500,
                            }}
                        >
                            Open Source <ExternalLink size={9} />
                        </a>
                    )}
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

            {/* Content snippet */}
            {content && (
                <p
                    style={{
                        marginTop: "10px",
                        fontSize: "12px",
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
            )}

            {/* Tags row */}
            {(score !== undefined || chunk !== undefined || document) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                    {score !== undefined && (
                        <span
                            className="badge"
                            style={{ background: "rgba(0,212,160,0.12)", color: "var(--primary)" }}
                        >
                            {(score * 100).toFixed(1)}% match
                        </span>
                    )}
                    {chunk !== undefined && (
                        <span
                            className="badge"
                            style={{ background: "rgba(0,144,255,0.12)", color: "#0090ff" }}
                        >
                            chunk {chunk}
                        </span>
                    )}
                    {document && (
                        <span
                            className="badge"
                            style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c" }}
                        >
                            {document}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

function SourcePanel({ sources = [], loading = false }) {
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
                            background: "rgba(0,144,255,0.12)",
                            border: "1px solid rgba(0,144,255,0.2)",
                        }}
                    >
                        <FileText size={15} style={{ color: "#0090ff" }} />
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: 700 }}>Retrieved Sources</p>
                        <p className="label" style={{ marginTop: "1px" }}>Context used for response</p>
                    </div>
                </div>
                <span
                    className="badge"
                    style={{ background: "rgba(0,144,255,0.12)", color: "#0090ff" }}
                >
                    <Sparkles size={10} />
                    {sources.length}
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
                    Loading sources…
                </p>
            )}

            {!loading && sources.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "18px 0",
                        fontSize: "12px",
                        color: "var(--secondary)",
                        lineHeight: 1.6,
                    }}
                >
                    No sources retrieved<br />for this query yet.
                </div>
            )}

            {sources.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {sources.map((source, i) => (
                        <SourceCard key={source?.id || i} source={source} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SourcePanel;