"""
document_loader.py

Loads documents from either:
1. Website URL
2. PDF File

Both use the same chunking pipeline.
"""

import os
import uuid
import fitz

from app.rag.scraper import scrape_website
from app.rag.text_cleaner import clean_text
from app.rag.chunker import split_into_chunks

from app.models.document_models import Document
from app.utils.logger import logger


class DocumentLoader:

    def load_url(self, url: str):

        logger.info("Scraping website...")

        raw_text = scrape_website(url)

        return self._create_document(
            raw_text,
            url,
        )

    def load_pdf(self, pdf_path: str):

        logger.info("Reading PDF...")

        doc = fitz.open(pdf_path)

        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        return self._create_document(
            text,
            os.path.basename(pdf_path),
        )

    def _create_document(
        self,
        raw_text: str,
        source: str,
    ):

        logger.info("Cleaning text...")

        cleaned_text = clean_text(raw_text)

        document_id = str(uuid.uuid4())

        logger.info("Creating chunks...")

        chunks = split_into_chunks(
            cleaned_text,
            source=source,
            document_id=document_id,
        )

        logger.info(f"Created {len(chunks)} chunks.")

        return Document(
            document_id=document_id,
            source=source,
            chunks=chunks,
        )


loader = DocumentLoader()


def load_document(url: str):
    return loader.load_url(url)


def load_pdf_document(pdf_path: str):
    return loader.load_pdf(pdf_path)