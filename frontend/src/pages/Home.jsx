import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import ToolPanel from "../components/ToolPanel";
import PipelineStatus from "../components/PipelineStatus";
import MemoryPanel from "../components/MemoryPanel";
import SourcePanel from "../components/SourcePanel";
import useChat from "../hooks/useChat";

function Home() {
    const {
        messages,
        loading,
        uploadStats,
        setUploadStats,
        memory,
        sources,
        graph,
        ragChunks,
        handleSend,
    } = useChat();

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 300px",
                gap: "16px",
                height: "100%",
                minHeight: 0,
            }}
        >
            {/* ── Chat column ── */}
            <div
                className="glass-card"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    minHeight: 0,
                }}
            >
                <ChatWindow
                    messages={messages}
                    loading={loading}
                    onSuggestionClick={handleSend}
                />
                <ChatInput
                    onSend={handleSend}
                    onUpload={() => {}}
                    loading={loading}
                />
            </div>

            {/* ── Right panels column ── */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    overflowY: "auto",
                    minHeight: 0,
                    paddingRight: "2px",
                }}
            >
                <ToolPanel
                    backendStatus="online"
                    onUploadSuccess={(stats) => setUploadStats(stats)}
                />
                <PipelineStatus uploadStats={uploadStats} ragChunks={ragChunks} graphUsed={graph.length > 0} />
                <MemoryPanel memories={memory} />
                <SourcePanel sources={sources} />
            </div>
        </div>
    );
}

export default Home;