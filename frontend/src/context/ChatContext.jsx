import {
    createContext,
    useContext,
    useState,
} from "react";

import {
    sendMessage,
    uploadDocument,
} from "../services/chatService";

const defaultContextValue = {
    messages: [],
    loading: false,
    uploadStats: null,
    setUploadStats: () => {},
    memory: [],
    sources: [],
    graph: [],
    ragChunks: 0,
    handleSend: async () => {},
    handleFileUpload: async () => {},
    clearConversation: () => {},
};

const ChatContext = createContext(defaultContextValue);

export function ChatProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadStats, setUploadStats] = useState(null);
    const [memory, setMemory] = useState([]);
    const [sources, setSources] = useState([]);
    const [graph, setGraph] = useState([]);
    const [ragChunks, setRagChunks] = useState(0);

    async function handleSend(question) {
        if (!question || !question.trim()) return;

        const userMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await sendMessage(question);

            const assistantMessage = {
                role: "assistant",
                content: response.answer,
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);

            setMemory(response.memory || []);
            setSources(response.rag || []);
            setGraph(response.graph || []);
            setRagChunks(response.rag_chunks || 0);

        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        error.answer ||
                        "Something went wrong while generating the response.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    async function handleFileUpload(file) {
        if (!file) return;
        setLoading(true);

        try {
            const response = await uploadDocument(file);
            if (response.success && response.data) {
                setUploadStats(response.data);
            }
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function clearConversation() {
        setMessages([]);
        setMemory([]);
        setSources([]);
        setGraph([]);
        setRagChunks(0);
    }

    return (
        <ChatContext.Provider
            value={{
                messages,
                loading,
                uploadStats,
                setUploadStats,
                memory,
                sources,
                graph,
                ragChunks,
                handleSend,
                handleFileUpload,
                clearConversation,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    return useContext(ChatContext);
}