"""
hybrid_retriever.py

Combines:
1. RAG Retrieval
2. Long-Term Memory Retrieval
3. Knowledge Graph Retrieval
"""

from app.rag.retriever import Retriever
from app.memory.memory_manager import MemoryManager
from app.graph.graph_retriever import GraphRetriever

from app.utils.logger import logger


class HybridRetriever:

    def __init__(self):

        logger.info("Initializing Hybrid Retriever...")

        self.rag = Retriever()
        self.memory = MemoryManager()
        self.graph = GraphRetriever()

        logger.info("Hybrid Retriever initialized successfully.")

    def retrieve(
        self,
        user_id: str,
        question: str,
    ):

        logger.info("=" * 60)
        logger.info("Starting Hybrid Retrieval")

        # ---------------- RAG ---------------- #

        try:

            logger.info("Running RAG Retrieval...")

            rag_context = self.rag.retrieve(question)

            logger.info(
                f"Retrieved {len(rag_context)} RAG chunks."
            )

        except Exception as e:

            logger.exception("RAG Retrieval Failed")

            rag_context = []

        # ------------- MEMORY ------------- #

        try:

            logger.info("Running Memory Retrieval...")

            memory_context = self.memory.retrieve_memory_context(
                user_id,
                question,
            )

            logger.info("Memory Retrieval Completed.")

        except Exception as e:

            logger.exception("Memory Retrieval Failed")

            memory_context = ""

        # ------------- GRAPH ------------- #

        try:

            logger.info("Running Graph Retrieval...")

            graph_context = self.graph.retrieve(
                user_id,
                question,
            )

            logger.info("Graph Retrieval Completed.")

        except Exception as e:

            logger.exception("Graph Retrieval Failed")

            graph_context = ""

        logger.info("Hybrid Retrieval Finished")
        logger.info("=" * 60)

        return {
            "memory": memory_context,
            "graph": graph_context,
            "rag": rag_context,
        }