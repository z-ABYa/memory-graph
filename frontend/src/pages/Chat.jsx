import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import ToolPanel from "../components/ToolPanel";
import PipelineStatus from "../components/PipelineStatus";
import MemoryPanel from "../components/MemoryPanel";
import SourcePanel from "../components/SourcePanel";

import useChat from "../hooks/useChat";

function Chat() {

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

        <div className="grid grid-cols-12 gap-6 h-full">

            {/* ===========================
                    Chat Section
            ============================ */}

            <div

                className="col-span-7 rounded-3xl border flex flex-col overflow-hidden"

                style={{

                    background: "var(--card)",

                    borderColor: "var(--border)",

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

            {/* ===========================
                  Right Sidebar
            ============================ */}

            <div

                className="col-span-5 space-y-6 overflow-y-auto"

            >

                <ToolPanel

                    backendStatus="online"

                    onUploadSuccess={(stats) => setUploadStats(stats)}

                />

                <PipelineStatus

                    uploadStats={uploadStats}

                    ragChunks={ragChunks}

                    graphUsed={graph.length > 0}

                />

                <MemoryPanel

                    memories={memory}

                />

                <SourcePanel

                    sources={sources}

                />

            </div>

        </div>

    );

}

export default Chat;