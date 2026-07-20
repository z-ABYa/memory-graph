import { BrainCircuit } from "lucide-react";

function LoadingSpinner({

    text = "Thinking...",

    fullScreen = false,

}) {

    const content = (

        <div className="flex flex-col items-center justify-center gap-5">

            <div className="relative">

                <div

                    className="w-20 h-20 rounded-3xl flex items-center justify-center animate-pulse"

                    style={{

                        background: "#10A37F",

                    }}

                >

                    <BrainCircuit

                        size={38}

                        color="#fff"

                    />

                </div>

                <div

                    className="absolute inset-0 rounded-3xl animate-ping opacity-20"

                    style={{

                        background: "#10A37F",

                    }}

                />

            </div>

            <div className="text-center">

                <h2 className="text-xl font-semibold">

                    Memory Graph

                </h2>

                <p

                    className="mt-2"

                    style={{

                        color: "var(--secondary)",

                    }}

                >

                    {text}

                </p>

            </div>

            <div className="flex gap-2">

                <span

                    className="w-3 h-3 rounded-full animate-bounce"

                    style={{

                        background: "#10A37F",

                        animationDelay: "0ms",

                    }}

                />

                <span

                    className="w-3 h-3 rounded-full animate-bounce"

                    style={{

                        background: "#10A37F",

                        animationDelay: "150ms",

                    }}

                />

                <span

                    className="w-3 h-3 rounded-full animate-bounce"

                    style={{

                        background: "#10A37F",

                        animationDelay: "300ms",

                    }}

                />

            </div>

        </div>

    );

    if (fullScreen) {

        return (

            <div

                className="fixed inset-0 flex items-center justify-center z-50"

                style={{

                    background: "var(--bg)",

                }}

            >

                {content}

            </div>

        );

    }

    return (

        <div className="flex items-center justify-center py-12">

            {content}

        </div>

    );

}

export default LoadingSpinner;