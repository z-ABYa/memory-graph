import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useChat from "../../hooks/useChat";

function Layout() {
    const { clearConversation } = useChat();
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") !== "light";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div
            className="h-screen flex flex-col"
            style={{
                background: "var(--bg)",
                color: "var(--text)",
            }}
        >
            {/* Top Navigation Bar */}
            <Navbar
                darkMode={darkMode}
                toggleTheme={() => setDarkMode((prev) => !prev)}
                clearConversation={clearConversation}
            />

            {/* Main Application Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar Navigation */}
                <Sidebar onClearConversation={clearConversation} />

                {/* Main Content Pane — animated page transitions */}
                <main
                    key={location.pathname}
                    className="flex-1 p-6 overflow-y-auto page-enter"
                    style={{ minWidth: 0 }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
