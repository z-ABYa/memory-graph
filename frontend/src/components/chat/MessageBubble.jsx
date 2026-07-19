import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BrainCircuit, User } from "lucide-react";

function MessageBubble({ message }) {
    const isUser  = message.role === "user";
    const isError = message.type === "error";

    return (
        <div
            className="fade-in"
            style={{
                display: "flex",
                flexDirection: isUser ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: "10px",
            }}
        >
            {/* Avatar */}
            <div
                style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isUser
                        ? "linear-gradient(135deg, #00d4a0, #00b887)"
                        : isError
                        ? "#ff4d4d"
                        : "var(--card-2)",
                    border: "1px solid var(--border-2)",
                    boxShadow: isUser ? "0 2px 8px rgba(0,212,160,0.3)" : "var(--shadow-sm)",
                }}
            >
                {isUser
                    ? <User size={14} color="#fff" />
                    : <BrainCircuit size={14} color={isError ? "#fff" : "var(--primary)"} />
                }
            </div>

            {/* Bubble */}
            <div
                className={isUser ? "bubble-user" : "bubble-ai"}
                style={isError ? {
                    background: "rgba(255,77,77,0.1)",
                    border: "1px solid rgba(255,77,77,0.3)",
                    color: "#ff8080",
                } : {}}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default MessageBubble;