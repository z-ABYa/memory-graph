"""
vector_store.py

Stores and retrieves embeddings using ChromaDB.
"""

import chromadb

from app.config.settings import (
    CHROMA_DB_PATH,
    COLLECTION_NAME,
)

from app.utils.logger import logger


class VectorStore:

    def __init__(self):
        logger.info(f"Chroma Path : {CHROMA_DB_PATH}")
        logger.info(f"Collection : {COLLECTION_NAME}")

        self.client = chromadb.PersistentClient(
            path=CHROMA_DB_PATH
        )

    @property
    def collection(self):
        return self.client.get_or_create_collection(name=COLLECTION_NAME)

    def reset_collection(self):
        """Reset collection if dimension mismatch or stale collection error occurs."""
        logger.warning(
            f"Resetting collection '{COLLECTION_NAME}'..."
        )
        try:
            self.client.delete_collection(name=COLLECTION_NAME)
        except Exception as e:
            logger.error(f"Error deleting collection: {e}")

        return self.client.create_collection(name=COLLECTION_NAME)

    def add_documents(
        self,
        chunks,
        embeddings,
    ):

        ids = []
        documents = []
        metadatas = []

        for chunk in chunks:
            ids.append(f"{chunk.document_id}_{chunk.chunk_id}")
            documents.append(chunk.content)
            metadatas.append(
                {
                    "document_id": chunk.document_id,
                    "chunk_id": chunk.chunk_id,
                    "source": chunk.source,
                }
            )

        try:
            existing_ids = set(self.collection.get()["ids"])
        except Exception as e:
            logger.warning(f"Chroma get failed ({e}), resetting collection...")
            self.reset_collection()
            existing_ids = set()

        logger.info(f"Existing documents before insert : {len(existing_ids)}")

        new_ids = []
        new_documents = []
        new_embeddings = []
        new_metadatas = []

        for i, doc_id in enumerate(ids):
            if doc_id not in existing_ids:
                new_ids.append(doc_id)
                new_documents.append(documents[i])
                new_embeddings.append(embeddings[i])
                new_metadatas.append(metadatas[i])

        if new_ids:
            try:
                self.collection.add(
                    ids=new_ids,
                    documents=new_documents,
                    embeddings=new_embeddings,
                    metadatas=new_metadatas,
                )
            except Exception as e:
                logger.warning(f"Collection add failed ({e}), resetting collection...")
                col = self.reset_collection()
                col.add(
                    ids=new_ids,
                    documents=new_documents,
                    embeddings=new_embeddings,
                    metadatas=new_metadatas,
                )

            logger.info(f"{len(new_ids)} chunks stored successfully.")
            logger.info(f"Collection Count After Insert : {self.collection.count()}")

        else:
            logger.info("All chunks already exist in ChromaDB.")
            logger.info(f"Collection Count : {self.collection.count()}")