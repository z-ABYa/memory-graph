from fastapi import APIRouter, UploadFile, File, HTTPException, Form
import os
import shutil
import uuid

from app.rag.ingestion_pipeline import IngestionPipeline

router = APIRouter()

pipeline = IngestionPipeline()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_pdf(
    file: UploadFile = File(...),
    user_id: str = Form("default_user"),
):

    try:

        if not file.filename.lower().endswith(".pdf"):

            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )

        filename = f"{uuid.uuid4()}.pdf"

        file_path = os.path.join(
            UPLOAD_DIR,
            filename,
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        result = pipeline.ingest_pdf(
            pdf_path=file_path,
            user_id=user_id,
        )

        return {
            "success": True,
            "message": "PDF uploaded and processed successfully.",
            "data": result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )