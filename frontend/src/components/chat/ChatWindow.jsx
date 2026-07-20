import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { BrainCircuit, Zap, BookOpen, GitBranch } from "lucide-react";

const SUGGESTIONS = [
    { icon: BookOpen,   text: "Summarize uploaded documents",           color: "#00d4a0" },
    { icon: BrainCircuit, text: "What do you remember about me?",      color: "#818cf8" },
    { icon: GitBranch,  text: "Show entity relationships in the graph", color: "#fb923c" },
    { icon: Zap,        text: "Answer using retrieved knowledge",       color: "#f472b6" },
];

function ChatWindow({ messages, loading, onSuggestionClick }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div
            style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {messages.length === 0 ? (
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "28px",
                        textAlign: "center",
                        padding: "40px 20px",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "20px",
                                background: "linear-gradient(135deg, #00d4a0, #0090ff)",
                                opacity: 0.15,
                                animation: "pulse-ring 2.5s ease-in-out infinite",
                            }}
                        />
                    </div>

                    <div>
                        <h1
                            style={{
                                fontSize: "26px",
                                fontWeight: 700,
                                letterSpacing: "-0.5px",
                                marginBottom: "8px",
                            }}
                        >
                            Welcome to{" "}
                            <span className="gradient-text">MemoryGraph</span>
                        </h1>
                        <p
                            style={{
                                fontSize: "13.5px",
                                color: "var(--secondary)",
                                maxWidth: "380px",
                                lineHeight: 1.7,
                            }}
                        >
                            Upload documents, scrape websites, and chat with a personalized AI that remembers
                            you — powered by Hybrid RAG, Knowledge Graph &amp; LangGraph.
                        </p>
                    </div>

                    {/* Suggestion chips */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "10px",
                            width: "100%",
                            maxWidth: "480px",
                        }}
                    >
                        {SUGGESTIONS.map(({ icon: Icon, text, color }) => (
                            <button
                                key={text}
                                onClick={() => onSuggestionClick(text)}
                                style={{
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "14px",
                                    padding: "12px 14px",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "var(--card-2)";
                                    e.currentTarget.style.borderColor = `${color}40`;
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "var(--card)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <Icon size={16} style={{ color }} />
                                <span style={{ fontSize: "12.5px", color: "var(--text-2)", lineHeight: 1.4 }}>
                                    {text}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {messages.map((message, i) => (
                        <MessageBubble key={i} message={message} />
                    ))}
                    {loading && <TypingIndicator />}
                    <div ref={bottomRef} />
                </div>
            )}

            {messages.length > 0 && (
                <div ref={bottomRef} />
            )}
        </div>
    );
}

export default ChatWindow;