"""
ingestion_pipeline.py

Runs the complete document ingestion pipeline.

Supports:
1. Website URL
2. PDF Upload

Pipeline:

Input
    ↓
Document Loader
    ↓
Chunking
    ↓
Embedding Generation
    ↓
ChromaDB
    ↓
Knowledge Graph
"""

from app.rag.document_loader import (
    load_document,
    load_pdf_document,
)

from app.rag.embeddings import EmbeddingGenerator
from app.rag.vector_store import VectorStore
from app.graph.graph_builder import GraphBuilder

from app.utils.logger import logger


class IngestionPipeline:

    def __init__(self):

        self.embedding_generator = EmbeddingGenerator()
        self.vector_store = VectorStore()
        self.graph_builder = GraphBuilder()

    def _process_document(
        self,
        document,
        user_id: str,
    ):
        """
        Common pipeline used for both
        website and PDF ingestion.
        """

        chunks = document.chunks

        logger.info("Generating embeddings...")

        embeddings = self.embedding_generator.generate_embeddings(
            chunks
        )

        logger.info("Saving vectors...")

        self.vector_store.add_documents(
            chunks,
            embeddings,
        )

        logger.info("Building Knowledge Graph...")

        graph_built = self.graph_builder.build_from_chunks(
            user_id=user_id,
            chunks=[
                chunk.content
                for chunk in chunks
            ],
        )

        logger.info("Pipeline completed successfully.")

        return {
            "status": "success",
            "document_id": document.document_id,
            "source": document.source,
            "chunks": len(chunks),

            # ---------- NEW ----------
            "embeddings": len(embeddings),
            "graph_status": (
                "Built Successfully"
                if graph_built
                else "Skipped"
            ),
            "vector_store": "Updated",
        }

    def ingest_url(
        self,
        url: str,
        user_id: str = "default_user",
    ):

        logger.info("Starting Website Ingestion...")

        document = load_document(url)

        return self._process_document(
            document,
            user_id,
        )

    def ingest_pdf(
        self,
        pdf_path: str,
        user_id: str = "default_user",
    ):

        logger.info("Starting PDF Ingestion...")

        document = load_pdf_document(pdf_path)

        return self._process_document(
            document,
            user_id,
        )