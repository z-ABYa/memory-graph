"""
router.py

Executes the LangGraph workflow.
"""

from app.langgraph_flow.workflow import graph


class LangGraphRouter:

    def run(
        self,
        user_id: str,
        question: str,
    ):

        result = graph.invoke(
            {
                "user_id": user_id,
                "question": question,
                "context": {},
                "prompt": "",
                "answer": "",
            }
        )

        context = result.get("context", {})

        memory = context.get("memory") or []
        graph_context = context.get("graph") or []
        rag = context.get("rag") or []

        # Normalize values so frontend always receives lists
        if not isinstance(memory, list):
            memory = [memory]

        if not isinstance(graph_context, list):
            graph_context = [graph_context]

        if not isinstance(rag, list):
            rag = [rag]

        return {

            "answer": result.get("answer", ""),

            "memory": memory,

            "graph": graph_context,

            "rag": rag,

            "stats": {

                "memory_used": len(memory) > 0,

                "graph_used": len(graph_context) > 0,

                "rag_chunks": len(rag),

            },

        }