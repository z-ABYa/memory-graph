from fastapi import APIRouter, UploadFile, File, HTTPException, Form, BackgroundTasks
import os
import tempfile

from app.rag.ingestion_pipeline import IngestionPipeline

router = APIRouter()

pipeline = IngestionPipeline()


@router.post("/")
async def upload_pdf(
    file: UploadFile = File(...),
    user_id: str = Form("default_user"),
    background_tasks: BackgroundTasks = BackgroundTasks(),
):

    try:

        if not file.filename.lower().endswith(".pdf"):

            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )

        # Write to /tmp — always writable on Render and any Linux host
        with tempfile.NamedTemporaryFile(
            suffix=".pdf",
            delete=False,
            dir="/tmp",
        ) as tmp:
            content = await file.read()
            tmp.write(content)
            file_path = tmp.name

        try:
            result, document = pipeline.ingest_pdf(
                pdf_path=file_path,
                user_id=user_id,
            )
        finally:
            # Clean up temp file after processing
            os.unlink(file_path)

        # Build knowledge graph in the background — doesn't block response
        background_tasks.add_task(
            pipeline.build_graph_for_document,
            document,
            user_id,
        )

        return {
            "success": True,
            "message": "PDF uploaded and embedded. Graph building in background.",
            "data": result,
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )