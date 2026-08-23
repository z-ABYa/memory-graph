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

        Embeds chunks and saves to ChromaDB immediately.
        Returns result right away — graph building happens separately
        via _build_graph_async so it doesn't block the HTTP response.
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

        logger.info("Pipeline completed successfully. Graph will build in background.")

        return {
            "status": "success",
            "document_id": document.document_id,
            "source": document.source,
            "chunks": len(chunks),
            "embeddings": len(embeddings),
            "graph_status": "Building in background",
            "vector_store": "Updated",
        }

    def build_graph_for_document(
        self,
        document,
        user_id: str,
    ):
        """
        Builds the knowledge graph for a document.
        Intended to be called as a FastAPI BackgroundTask
        so it does not block the HTTP response.
        """

        logger.info("Background: Building Knowledge Graph...")

        try:
            self.graph_builder.build_from_chunks(
                user_id=user_id,
                chunks=[chunk.content for chunk in document.chunks],
            )
            logger.info("Background: Knowledge Graph built successfully.")
        except Exception as e:
            logger.error(f"Background: Graph build failed: {e}")

    def ingest_url(
        self,
        url: str,
        user_id: str = "default_user",
    ):

        logger.info("Starting Website Ingestion...")

        document = load_document(url)
        result = self._process_document(document, user_id)

        # Return both so the API can schedule graph building as a BackgroundTask
        return result, document

    def ingest_pdf(
        self,
        pdf_path: str,
        user_id: str = "default_user",
    ):

        logger.info("Starting PDF Ingestion...")

        document = load_pdf_document(pdf_path)
        result = self._process_document(document, user_id)

        # Return both so the API can schedule graph building as a BackgroundTask
        return result, document