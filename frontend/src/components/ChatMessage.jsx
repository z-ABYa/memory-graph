import { User, BrainCircuit, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({

    message,

}) {

    const isUser = message.role === "user";

    const isError = message.type === "error";

    return (

        <div

            className={`flex gap-4 mb-6 ${

                isUser

                    ? "flex-row-reverse"

                    : "flex-row"

            }`}

        >

            {/* Avatar */}

            <div

                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"

                style={{

                    background: isUser

                        ? "#10A37F"

                        : isError

                        ? "#DC2626"

                        : "var(--card)",

                    border: isUser

                        ? "none"

                        : "1px solid var(--border)",

                }}

            >

                {

                    isUser

                        ?

                        <User

                            size={20}

                            color="#fff"

                        />

                        :

                        isError

                            ?

                            <AlertTriangle

                                size={20}

                                color="#fff"

                            />

                            :

                            <BrainCircuit

                                size={20}

                                color="#10A37F"

                            />

                }

            </div>

            {/* Message */}

            <div

                className="max-w-[80%] rounded-2xl px-5 py-4"

                style={{

                    background: isUser

                        ? "#10A37F"

                        : isError

                        ? "#451A1A"

                        : "var(--card)",

                    color: isUser

                        ? "#fff"

                        : "var(--text)",

                    border: isUser

                        ? "none"

                        : "1px solid var(--border)",

                }}

            >

                <ReactMarkdown

                    remarkPlugins={[remarkGfm]}

                    components={{

                        code({

                            inline,

                            children,

                            ...props

                        }) {

                            if (inline) {

                                return (

                                    <code

                                        style={{

                                            background:

                                                "rgba(255,255,255,0.08)",

                                            padding:

                                                "2px 6px",

                                            borderRadius:

                                                "6px",

                                        }}

                                        {...props}

                                    >

                                        {children}

                                    </code>

                                );

                            }

                            return (

                                <pre

                                    className="overflow-x-auto rounded-xl p-4 mt-3"

                                    style={{

                                        background:

                                            "#111827",

                                    }}

                                >

                                    <code {...props}>

                                        {children}

                                    </code>

                                </pre>

                            );

                        },

                    }}

                >

                    {message.content}

                </ReactMarkdown>

                {

                    message.sources &&

                    message.sources.length > 0 && (

                        <div className="mt-5">

                            <h4

                                className="text-sm font-semibold mb-2"

                                style={{

                                    color: "var(--secondary)",

                                }}

                            >

                                Sources

                            </h4>

                            <div className="space-y-2">

                                {

                                    message.sources.map(

                                        (

                                            source,

                                            index

                                        ) => (

                                            <div

                                                key={index}

                                                className="rounded-lg px-3 py-2 text-sm"

                                                style={{

                                                    background:

                                                        "rgba(16,163,127,0.08)",

                                                }}

                                            >

                                                {source}

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default ChatMessage;