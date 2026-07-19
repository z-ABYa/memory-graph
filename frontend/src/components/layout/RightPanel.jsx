import {
    FileText,
    Database,
    Brain,
    Network,
    Link2,
    Cpu,
    CheckCircle2,
    Activity,
} from "lucide-react";

function StatCard({

    icon: Icon,

    title,

    value,

    color,

}) {

    return (

        <div

            className="rounded-2xl border p-4 transition-all duration-200 hover:scale-[1.02]"

            style={{

                background: "var(--card)",

                borderColor: "var(--border)",

            }}

        >

            <div className="flex items-center justify-between">

                <div>

                    <p

                        className="text-sm"

                        style={{

                            color: "var(--secondary)",

                        }}

                    >

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div

                    className="w-12 h-12 rounded-xl flex items-center justify-center"

                    style={{

                        background: color,

                    }}

                >

                    <Icon

                        size={22}

                        className="text-white"

                    />

                </div>

            </div>

        </div>

    );

}

function StatusItem({

    title,

    status = true,

}) {

    return (

        <div className="flex items-center justify-between">

            <span>{title}</span>

            {

                status

                    ?

                    <CheckCircle2

                        size={20}

                        color="#22C55E"

                    />

                    :

                    <Activity

                        size={20}

                        color="#EF4444"

                    />

            }

        </div>

    );

}

function RightPanel({

    analytics,

}) {

    return (

        <aside

            className="w-80 border-l overflow-y-auto"

            style={{

                background: "var(--sidebar)",

                borderColor: "var(--border)",

            }}

        >

            <div className="p-5">

                <h2 className="text-2xl font-bold">

                    Analytics

                </h2>

                <p

                    className="text-sm mt-1 mb-6"

                    style={{

                        color: "var(--secondary)",

                    }}

                >

                    Live Backend Statistics

                </p>

                <div className="space-y-4">

                    <StatCard

                        icon={FileText}

                        title="Documents"

                        value={analytics.documents}

                        color="#2563EB"

                    />

                    <StatCard

                        icon={Database}

                        title="Chunks"

                        value={analytics.chunks}

                        color="#7C3AED"

                    />

                    <StatCard

                        icon={Brain}

                        title="Memory"

                        value={analytics.memory}

                        color="#EC4899"

                    />

                    <StatCard

                        icon={Network}

                        title="KG Nodes"

                        value={analytics.nodes}

                        color="#10B981"

                    />

                    <StatCard

                        icon={Link2}

                        title="Relations"

                        value={analytics.relations}

                        color="#F59E0B"

                    />

                </div>

                {/* AI Model */}

                <div

                    className="rounded-2xl border p-5 mt-8"

                    style={{

                        background: "var(--card)",

                        borderColor: "var(--border)",

                    }}

                >

                    <div className="flex items-center gap-3 mb-5">

                        <Cpu

                            size={24}

                            color="#10A37F"

                        />

                        <h3 className="text-lg font-semibold">

                            Active Model

                        </h3>

                    </div>

                    <div className="space-y-4">

                        <div className="flex justify-between">

                            <span

                                style={{

                                    color: "var(--secondary)",

                                }}

                            >

                                LLM

                            </span>

                            <span>

                                Gemini 2.5 Flash

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span

                                style={{

                                    color: "var(--secondary)",

                                }}

                            >

                                Embeddings

                            </span>

                            <span>

                                all-MiniLM-L6-v2

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span

                                style={{

                                    color: "var(--secondary)",

                                }}

                            >

                                Vector DB

                            </span>

                            <span>

                                ChromaDB

                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span

                                style={{

                                    color: "var(--secondary)",

                                }}

                            >

                                Graph DB

                            </span>

                            <span>

                                Neo4j

                            </span>

                        </div>

                    </div>

                </div>

                {/* Status */}

                <div

                    className="rounded-2xl border p-5 mt-6"

                    style={{

                        background: "var(--card)",

                        borderColor: "var(--border)",

                    }}

                >

                    <div className="flex items-center gap-3 mb-5">

                        <Activity

                            size={22}

                            color="#10A37F"

                        />

                        <h3 className="text-lg font-semibold">

                            System Status

                        </h3>

                    </div>

                    <div className="space-y-4">

                        <StatusItem

                            title="Backend"

                        />

                        <StatusItem

                            title="Retriever"

                        />

                        <StatusItem

                            title="Knowledge Graph"

                        />

                        <StatusItem

                            title="Long-Term Memory"

                        />

                        <StatusItem

                            title="LLM"

                        />

                    </div>

                </div>

            </div>

        </aside>

    );

}

export default RightPanel;