from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.rag.ingestion_pipeline import IngestionPipeline

router = APIRouter()

pipeline = IngestionPipeline()


class ScrapeRequest(BaseModel):
    url: str
    user_id: str = "default_user"


@router.post("/")
def scrape(request: ScrapeRequest):

    try:

        result = pipeline.ingest_url(
            url=request.url,
            user_id=request.user_id,
        )

        return {
            "success": True,
            "message": "Website processed successfully.",
            "data": result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )