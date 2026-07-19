"""
evaluator.py

Simple evaluation utilities for chatbot responses.
"""


class Evaluator:

    def evaluate(self, question, answer, retrieved_context):

        rag_docs = retrieved_context.get("rag", [])
        memory = retrieved_context.get("memory", "")
        graph = retrieved_context.get("graph", "")

        score = 0

        if len(answer.strip()) > 30:
            score += 30

        if len(rag_docs) > 0:
            score += 30

        if memory:
            score += 20

        if graph:
            score += 20

        return {
            "score": score,
            "retrieved_docs": len(rag_docs),
            "memory_used": bool(memory),
            "graph_used": bool(graph),
            "answer_length": len(answer),
        }