"""
chunker.py

Splits cleaned text into overlapping chunks.
"""

from app.config.settings import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
)

from app.models.document_models import DocumentChunk


def split_into_chunks(
    text: str,
    source: str,
    document_id: str,
):
    """
    Split text into overlapping chunks.
    """

    chunks = []

    start = 0

    chunk_id = 1

    while start < len(text):

        end = start + CHUNK_SIZE

        chunk_text = text[start:end].strip()

        if chunk_text:

            chunk = DocumentChunk(
                document_id=document_id,
                chunk_id=chunk_id,
                content=chunk_text,
                source=source,
            )

            chunks.append(chunk)

            chunk_id += 1

        start += CHUNK_SIZE - CHUNK_OVERLAP

    return chunks