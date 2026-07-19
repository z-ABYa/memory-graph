"""
embeddings.py

Generates embeddings for document chunks.
"""

from sentence_transformers import SentenceTransformer

from app.config.settings import EMBEDDING_MODEL
from app.utils.logger import logger


class EmbeddingGenerator:

    def __init__(self):

        logger.info("Loading embedding model...")

        self.model = SentenceTransformer(
            EMBEDDING_MODEL
        )

        logger.info("Embedding model loaded successfully.")

    def generate_embeddings(self, chunks):
        """
        Generate embeddings for all chunks.

        Args:
            chunks (list[DocumentChunk])

        Returns:
            list[list[float]]
        """

        texts = [
            chunk.content
            for chunk in chunks
        ]

        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True
        )

        return embeddings.tolist()