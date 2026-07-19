import {
    FileText,
    Globe,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

function SourceCard({ source }) {

    const [expanded, setExpanded] = useState(false);

    // Supports multiple backend formats
    const title =
        source?.title ||
        source?.name ||
        source?.document ||
        source?.source ||
        "Retrieved Source";

    const content =
        source?.content ||
        source?.text ||
        source?.page_content ||
        source?.chunk ||
        (typeof source === "string" ? source : "");

    const url =
        source?.url ||
        source?.link ||
        "";

    const score = source?.score;

    const chunk =
        source?.chunk_index ??
        source?.chunk;

    const document =
        source?.document ||
        source?.source;

    const isUrl =
        !!url ||
        source?.type === "web";

    return (

        <div
            className="rounded-2xl border p-4"
            style={{
                background: "var(--card)",
                borderColor: "var(--border)",
            }}
        >

            <div className="flex items-start justify-between">

                <div className="flex gap-3 flex-1">

                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: "#10A37F",
                        }}
                    >

                        {

                            isUrl

                                ?

                                <Globe
                                    size={18}
                                    color="#fff"
                                />

                                :

                                <FileText
                                    size={18}
                                    color="#fff"
                                />

                        }

                    </div>

                    <div className="flex-1">

                        <h3 className="font-semibold break-words">

                            {title}

                        </h3>

                        {

                            url && (

                                <a

                                    href={url}

                                    target="_blank"

                                    rel="noreferrer"

                                    className="flex items-center gap-1 mt-1 text-sm text-[#10A37F] hover:underline"

                                >

                                    Open Source

                                    <ExternalLink size={14} />

                                </a>

                            )

                        }

                    </div>

                </div>

                <button

                    onClick={() =>

                        setExpanded(!expanded)

                    }

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

            {

                content && (

                    <div
                        className={`mt-4 leading-7 ${
                            expanded
                                ? ""
                                : "line-clamp-3"
                        }`}
                        style={{
                            color: "var(--secondary)",
                        }}
                    >

                        {content}

                    </div>

                )

            }

            <div className="flex flex-wrap gap-2 mt-4">

                {

                    score !== undefined && (

                        <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                                background: "#10A37F20",
                                color: "#10A37F",
                            }}
                        >

                            Score {(score * 100).toFixed(1)}%

                        </span>

                    )

                }

                {

                    chunk !== undefined && (

                        <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                                background: "#3B82F620",
                                color: "#3B82F6",
                            }}
                        >

                            Chunk {chunk}

                        </span>

                    )

                }

                {

                    document && (

                        <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                                background: "#F59E0B20",
                                color: "#F59E0B",
                            }}
                        >

                            {document}

                        </span>

                    )

                }

            </div>

        </div>

    );

}

function SourcePanel({

    sources = [],

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

                    <FileText
                        size={24}
                        color="#10A37F"
                    />

                    <div>

                        <h2 className="text-xl font-bold">

                            Retrieved Sources

                        </h2>

                        <p
                            className="text-sm"
                            style={{
                                color: "var(--secondary)",
                            }}
                        >

                            Sources used to generate this response

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

                    {sources.length}

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

                        Loading sources...

                    </div>

                )

            }

            {

                !loading &&

                sources.length === 0 && (

                    <div
                        className="py-10 text-center"
                        style={{
                            color: "var(--secondary)",
                        }}
                    >

                        No sources were retrieved for this query.

                    </div>

                )

            }

            <div className="space-y-4">

                {

                    sources.map((source, index) => (

                        <SourceCard

                            key={source?.id || index}

                            source={source}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default SourcePanel;