"""
prompt_builder.py

Creates the final prompt using:
- Long-Term Memory
- Knowledge Graph
- RAG Context
"""

from app.prompts.rag_prompt import SYSTEM_PROMPT


class PromptBuilder:

    def build_prompt(
        self,
        question: str,
        retrieved_context: dict,
    ) -> str:

        memory = retrieved_context.get("memory", "")
        graph = retrieved_context.get("graph", "")
        rag = retrieved_context.get("rag", [])

        rag_context = ""

        for chunk in rag:

            rag_context += chunk["content"]
            rag_context += "\n\n"

        context = f"""
====================
LONG TERM MEMORY
====================

{memory}

====================
KNOWLEDGE GRAPH
====================

{graph}

====================
RAG CONTEXT
====================

{rag_context}
"""

        return SYSTEM_PROMPT.format(
            context=context,
            question=question,
        )