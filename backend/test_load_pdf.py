import os
import sys

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.rag.document_loader import load_pdf_document

try:
    print("Testing load_pdf_document...")
    doc = load_pdf_document("/tmp/test_upload.pdf")
    print("Successfully loaded doc:", doc)
    print("Number of chunks:", len(doc.chunks))
except Exception as e:
    import traceback
    traceback.print_exc()
