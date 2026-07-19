import { useRef, useState } from "react";
import { Send, Paperclip, Loader2, ArrowUp } from "lucide-react";

function ChatInput({ onSend, onUpload, loading }) {
    const [text, setText] = useState("");
    const fileRef = useRef(null);
    const textareaRef = useRef(null);

    function sendMessage() {
        if (!text.trim() || loading) return;
        onSend(text.trim());
        setText("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function handleInput(e) {
        setText(e.target.value);
        // Auto-grow textarea
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
    }

    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) return;
        onUpload(file);
        e.target.value = "";
    }

    const canSend = text.trim().length > 0 && !loading;

    return (
        <div
            style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border)",
                background: "var(--card)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                    background: "var(--bg)",
                    border: "1px solid var(--border-2)",
                    borderRadius: "16px",
                    padding: "8px 8px 8px 14px",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocusCapture={e => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px var(--primary-dim)";
                }}
                onBlurCapture={e => {
                    e.currentTarget.style.borderColor = "var(--border-2)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                {/* Attachment button */}
                <button
                    onClick={() => fileRef.current?.click()}
                    disabled={loading}
                    title="Attach PDF"
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        background: "var(--card-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--secondary)",
                        marginBottom: "2px",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = "var(--text)";
                        e.currentTarget.style.background = "var(--card-hover)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = "var(--secondary)";
                        e.currentTarget.style.background = "var(--card-2)";
                    }}
                >
                    <Paperclip size={15} />
                </button>

                <input
                    ref={fileRef}
                    type="file"
                    hidden
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFile}
                />

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask anything… (Shift+Enter for new line)"
                    style={{
                        flex: 1,
                        resize: "none",
                        background: "none",
                        border: "none",
                        outline: "none",
                        color: "var(--text)",
                        fontSize: "13.5px",
                        lineHeight: "1.6",
                        padding: "4px 0",
                        maxHeight: "160px",
                        overflowY: "auto",
                        fontFamily: "inherit",
                    }}
                />

                {/* Send button */}
                <button
                    onClick={sendMessage}
                    disabled={!canSend}
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        border: "none",
                        background: canSend
                            ? "linear-gradient(135deg, #00d4a0, #00b887)"
                            : "var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#fff",
                        marginBottom: "2px",
                        transition: "all 0.2s",
                        boxShadow: canSend ? "0 4px 12px rgba(0,212,160,0.3)" : "none",
                    }}
                >
                    {loading
                        ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                        : <ArrowUp size={16} />
                    }
                </button>
            </div>

            <p
                style={{
                    textAlign: "center",
                    fontSize: "10.5px",
                    color: "var(--secondary)",
                    marginTop: "8px",
                }}
            >
                AI can make mistakes. Review important information.
            </p>
        </div>
    );
}

export default ChatInput;