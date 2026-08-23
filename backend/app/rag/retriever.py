"""
retriever.py

Retrieves relevant chunks from ChromaDB.
"""

from app.rag.embeddings import EmbeddingGenerator
from app.rag.vector_store import VectorStore
from app.utils.logger import logger


class Retriever:

    def __init__(self):

        self.embedding_generator = EmbeddingGenerator()

        self.vector_store = VectorStore()

        logger.info(
            f"Connected to collection with "
            f"{self.vector_store.collection.count()} documents."
        )

    def retrieve(
        self,
        query: str,
        top_k: int = 3,
    ):

        logger.info("=" * 60)
        logger.info("RAG Retrieval Started")
        logger.info(f"Query : {query}")

        query_embedding = self.embedding_generator.embed_query(query)

        logger.info(
            f"Collection Count : {self.vector_store.collection.count()}"
        )

        results = self.vector_store.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
        )

        logger.info("Raw Chroma Result:")
        logger.info(results)

        retrieved_chunks = []

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        logger.info(
            f"Retrieved {len(documents)} documents."
        )

        for doc, meta in zip(documents, metadatas):

            retrieved_chunks.append(
                {
                    "content": doc,
                    "source": meta["source"],
                }
            )

        logger.info("Final Retrieved Chunks:")
        logger.info(retrieved_chunks)
        logger.info("=" * 60)

        return retrieved_chunks