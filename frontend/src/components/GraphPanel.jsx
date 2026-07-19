import { useMemo } from "react";
import {
    Network,
    Circle,
    GitBranch,
} from "lucide-react";

function GraphNode({

    node,

    active,

    onClick,

}) {

    return (

        <button

            onClick={() => onClick(node)}

            className="w-full text-left rounded-xl border p-3 transition-all duration-200"

            style={{

                background: active
                    ? "#10A37F15"
                    : "var(--card)",

                borderColor: active
                    ? "#10A37F"
                    : "var(--border)",

            }}

        >

            <div className="flex items-center gap-3">

                <Circle

                    size={10}

                    fill="#10A37F"

                    color="#10A37F"

                />

                <span className="font-medium">

                    {node.label || node.id}

                </span>

            </div>

        </button>

    );

}

function RelationCard({

    relation,

}) {

    return (

        <div

            className="rounded-xl border p-3"

            style={{

                background: "var(--bg)",

                borderColor: "var(--border)",

            }}

        >

            <div className="flex items-center gap-2 mb-2">

                <GitBranch

                    size={16}

                    color="#10A37F"

                />

                <span className="font-semibold">

                    {relation.type}

                </span>

            </div>

            <div

                className="text-sm"

                style={{

                    color: "var(--secondary)",

                }}

            >

                <strong>

                    {relation.source}

                </strong>

                {"  →  "}

                <strong>

                    {relation.target}

                </strong>

            </div>

        </div>

    );

}

function GraphPanel({

    graph = {

        nodes: [],

        relationships: [],

    },

    selectedNode,

    onNodeSelect = () => {},

    loading = false,

}) {

    const relatedRelations = useMemo(() => {

        if (!selectedNode)

            return graph.relationships;

        return graph.relationships.filter(

            (r) =>

                r.source === selectedNode.id ||

                r.target === selectedNode.id

        );

    }, [

        graph,

        selectedNode,

    ]);

    return (

        <div

            className="rounded-3xl border"

            style={{

                background: "var(--card)",

                borderColor: "var(--border)",

            }}

        >

            {/* Header */}

            <div

                className="p-6 border-b"

                style={{

                    borderColor: "var(--border)",

                }}

            >

                <div className="flex items-center gap-3">

                    <Network

                        size={24}

                        color="#10A37F"

                    />

                    <div>

                        <h2 className="text-xl font-bold">

                            Knowledge Graph

                        </h2>

                        <p

                            className="text-sm"

                            style={{

                                color:

                                    "var(--secondary)",

                            }}

                        >

                            Entity relationships extracted from your knowledge base

                        </p>

                    </div>

                </div>

            </div>

            {

                loading && (

                    <div

                        className="p-10 text-center"

                        style={{

                            color:

                                "var(--secondary)",

                        }}

                    >

                        Loading graph...

                    </div>

                )

            }

            {

                !loading && (

                    <div className="grid grid-cols-2">

                        {/* Nodes */}

                        <div

                            className="border-r p-5"

                            style={{

                                borderColor:

                                    "var(--border)",

                            }}

                        >

                            <h3 className="font-semibold mb-4">

                                Entities

                            </h3>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto">

                                {

                                    graph.nodes.length === 0

                                        ?

                                        (

                                            <p

                                                className="text-sm"

                                                style={{

                                                    color:

                                                        "var(--secondary)",

                                                }}

                                            >

                                                No entities found.

                                            </p>

                                        )

                                        :

                                        graph.nodes.map(

                                            (

                                                node

                                            ) => (

                                                <GraphNode

                                                    key={

                                                        node.id

                                                    }

                                                    node={

                                                        node

                                                    }

                                                    active={

                                                        selectedNode?.id ===

                                                        node.id

                                                    }

                                                    onClick={

                                                        onNodeSelect

                                                    }

                                                />

                                            )

                                        )

                                }

                            </div>

                        </div>

                        {/* Relationships */}

                        <div className="p-5">

                            <h3 className="font-semibold mb-4">

                                Relationships

                            </h3>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto">

                                {

                                    relatedRelations.length === 0

                                        ?

                                        (

                                            <p

                                                className="text-sm"

                                                style={{

                                                    color:

                                                        "var(--secondary)",

                                                }}

                                            >

                                                No relationships available.

                                            </p>

                                        )

                                        :

                                        relatedRelations.map(

                                            (

                                                relation,

                                                index

                                            ) => (

                                                <RelationCard

                                                    key={

                                                        index

                                                    }

                                                    relation={

                                                        relation

                                                    }

                                                />

                                            )

                                        )

                                }

                            </div>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default GraphPanel;