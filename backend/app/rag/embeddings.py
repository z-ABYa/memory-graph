"""
embeddings.py

Generates embeddings for document chunks using the Gemini Embedding API.

Replaced local sentence-transformers (torch + ~400MB model weights) with
the Gemini text-embedding-004 API to stay within Render's 512MB free tier.
"""

from google import genai
from google.genai import types

from app.config.settings import GEMINI_API_KEY
from app.utils.logger import logger

# Gemini embedding model — no local weights downloaded
GEMINI_EMBEDDING_MODEL = "text-embedding-004"

client = genai.Client(api_key=GEMINI_API_KEY)


class EmbeddingGenerator:

    def __init__(self):
        logger.info(
            f"EmbeddingGenerator ready — using Gemini API model: {GEMINI_EMBEDDING_MODEL}"
        )

    def _embed_text(self, text: str) -> list[float]:
        """Embed a single string via the Gemini API."""
        response = client.models.embed_content(
            model=GEMINI_EMBEDDING_MODEL,
            contents=text,
            config=types.EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT"),
        )
        return response.embeddings[0].values

    def embed_query(self, query: str) -> list[float]:
        """Embed a query string for retrieval."""
        response = client.models.embed_content(
            model=GEMINI_EMBEDDING_MODEL,
            contents=query,
            config=types.EmbedContentConfig(task_type="RETRIEVAL_QUERY"),
        )
        return response.embeddings[0].values

    def generate_embeddings(self, chunks) -> list[list[float]]:
        """
        Generate embeddings for all chunks.

        Args:
            chunks (list[DocumentChunk])

        Returns:
            list[list[float]]
        """
        embeddings = []

        for chunk in chunks:
            embedding = self._embed_text(chunk.content)
            embeddings.append(embedding)

        logger.info(f"Generated {len(embeddings)} embeddings via Gemini API.")
        return embeddings