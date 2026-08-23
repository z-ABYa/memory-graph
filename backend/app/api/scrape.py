from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel

from app.rag.ingestion_pipeline import IngestionPipeline

router = APIRouter()

pipeline = IngestionPipeline()


class ScrapeRequest(BaseModel):
    url: str
    user_id: str = "default_user"


@router.post("/")
def scrape(request: ScrapeRequest, background_tasks: BackgroundTasks):

    try:

        result, document = pipeline.ingest_url(
            url=request.url,
            user_id=request.user_id,
        )

        # Build knowledge graph in the background — doesn't block response
        background_tasks.add_task(
            pipeline.build_graph_for_document,
            document,
            request.user_id,
        )

        return {
            "success": True,
            "message": "Website scraped and embedded. Graph building in background.",
            "data": result,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )