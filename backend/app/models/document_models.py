"""
document_models.py

Contains models related to documents used in the RAG pipeline.
"""

from pydantic import BaseModel
from typing import List


class DocumentChunk(BaseModel):
    """
    Represents a single chunk of a document.
    """

    document_id: str
    chunk_id: int
    content: str
    source: str


class Document(BaseModel):
    """
    Represents an entire document after processing.
    """

    document_id: str
    source: str
    chunks: List[DocumentChunk]