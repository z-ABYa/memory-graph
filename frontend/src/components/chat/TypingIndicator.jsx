import { BrainCircuit } from "lucide-react";

function TypingIndicator() {
    return (
        <div
            className="fade-in"
            style={{
                display: "flex",
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
                    background: "var(--card-2)",
                    border: "1px solid var(--border-2)",
                }}
            >
                <BrainCircuit size={14} style={{ color: "var(--primary)" }} />
            </div>

            {/* Typing dots */}
            <div
                style={{
                    background: "var(--card-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                {[0, 150, 300].map((delay, i) => (
                    <span
                        key={i}
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--primary)",
                            display: "block",
                            animation: `bounce 1.2s ${delay}ms ease-in-out infinite`,
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30%           { transform: translateY(-6px); opacity: 1; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default TypingIndicator;