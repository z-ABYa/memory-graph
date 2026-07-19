"""
graph_builder.py

Builds the Knowledge Graph from any text.

This class acts as the bridge between your
RAG pipeline and the GraphManager.
"""

from app.graph.graph_manager import GraphManager


class GraphBuilder:

    def __init__(self):
        self.graph_manager = GraphManager()

    def build_from_text(
        self,
        user_id: str,
        text: str,
    ):
        """
        Build graph from a single text/document.
        """

        if not text:
            return False

        self.graph_manager.build_graph(
            user_id=user_id,
            text=text,
        )

        return True

    def build_from_chunks(
        self,
        user_id: str,
        chunks: list[str],
    ):
        """
        Build graph from document chunks.
        """

        if not chunks:
            return False

        for chunk in chunks:

            if chunk.strip():

                self.graph_manager.build_graph(
                    user_id=user_id,
                    text=chunk,
                )

        return True

    def build_from_documents(
        self,
        user_id: str,
        documents,
    ):
        """
        Supports LangChain Document objects.
        """

        if not documents:
            return False

        for doc in documents:

            text = getattr(doc, "page_content", "")

            if text.strip():

                self.graph_manager.build_graph(
                    user_id=user_id,
                    text=text,
                )

        return True