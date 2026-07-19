import {
    Brain,
    Clock3,
    Database,
    ChevronDown,
    ChevronUp,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

function MemoryCard({ memory }) {

    const [expanded, setExpanded] = useState(false);

    // Supports both object and string memories
    const title =
        memory?.title ||
        memory?.key ||
        "Retrieved Memory";

    const content =
        memory?.content ||
        memory?.text ||
        memory?.value ||
        (typeof memory === "string" ? memory : JSON.stringify(memory, null, 2));

    const timestamp =
        memory?.timestamp ||
        "Current Session";

    const score = memory?.score;

    return (

        <div
            className="rounded-2xl border p-4"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)",
            }}
        >

            <div className="flex items-start justify-between">

                <div className="flex gap-3">

                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: "#10A37F",
                        }}
                    >

                        <Brain
                            size={18}
                            color="#fff"
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold">

                            {title}

                        </h3>

                        <div
                            className="flex items-center gap-2 text-sm mt-1"
                            style={{
                                color: "var(--secondary)",
                            }}
                        >

                            <Clock3 size={14} />

                            <span>

                                {timestamp}

                            </span>

                        </div>

                    </div>

                </div>

                <button
                    onClick={() => setExpanded(!expanded)}
                >

                    {

                        expanded

                            ?

                            <ChevronUp size={18} />

                            :

                            <ChevronDown size={18} />

                    }

                </button>

            </div>

            <p
                className={`mt-4 leading-7 ${

                    expanded

                        ?

                        ""

                        :

                        "line-clamp-3"

                }`}
            >

                {content}

            </p>

            {

                score !== undefined && (

                    <div className="mt-4">

                        <div className="flex justify-between text-sm mb-2">

                            <span>

                                Similarity

                            </span>

                            <span>

                                {(score * 100).toFixed(1)}%

                            </span>

                        </div>

                        <div
                            className="h-2 rounded-full overflow-hidden"
                            style={{
                                background: "var(--border)",
                            }}
                        >

                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${score * 100}%`,
                                    background: "#10A37F",
                                }}
                            />

                        </div>

                    </div>

                )

            }

        </div>

    );

}

function MemoryPanel({

    memories = [],

    loading = false,

}) {

    return (

        <div
            className="rounded-3xl border p-6"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)",
            }}
        >

            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                    <Database
                        size={24}
                        color="#10A37F"
                    />

                    <div>

                        <h2 className="text-xl font-bold">

                            Long-Term Memory

                        </h2>

                        <p
                            className="text-sm"
                            style={{
                                color: "var(--secondary)",
                            }}
                        >

                            Retrieved memories used for this response

                        </p>

                    </div>

                </div>

                <div
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded-full"
                    style={{
                        background: "rgba(16,163,127,0.12)",
                        color: "#10A37F",
                    }}
                >

                    <Sparkles size={14} />

                    {memories.length}

                </div>

            </div>

            {

                loading && (

                    <div
                        className="py-10 text-center"
                        style={{
                            color: "var(--secondary)",
                        }}
                    >

                        Loading memories...

                    </div>

                )

            }

            {

                !loading && memories.length === 0 && (

                    <div
                        className="py-12 text-center"
                        style={{
                            color: "var(--secondary)",
                        }}
                    >

                        No memories were retrieved for this query.

                    </div>

                )

            }

            <div className="space-y-4">

                {

                    memories.map((memory, index) => (

                        <MemoryCard

                            key={memory?.id || index}

                            memory={memory}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default MemoryPanel;