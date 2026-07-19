import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import GraphExplorer from "./pages/GraphExplorer";
import Evaluation from "./pages/Evaluation";
import Settings from "./pages/Settings";

function App() {
    return (
        <ChatProvider>
            <BrowserRouter>
                <Routes>
                    {/* Unified Dashboard Layout Shell */}
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/graph" element={<GraphExplorer />} />
                        <Route path="/evaluation" element={<Evaluation />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>

                    {/* Fallback Catch-All */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </ChatProvider>
    );
}

export default App;