from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.hybrid_retriever import HybridRetriever
from app.rag.prompt_builder import PromptBuilder
from app.llm.gemini import GeminiClient
from app.evaluation.evaluator import Evaluator

router = APIRouter()

retriever = HybridRetriever()
builder = PromptBuilder()
gemini = GeminiClient()
evaluator = Evaluator()


class EvaluationRequest(BaseModel):
    user_id: str
    question: str


@router.post("/")
def evaluate(req: EvaluationRequest):

    context = retriever.retrieve(
        req.user_id,
        req.question,
    )

    prompt = builder.build_prompt(
        req.question,
        context,
    )

    answer = gemini.generate_response(prompt)

    report = evaluator.evaluate(
        req.question,
        answer,
        context,
    )

    return {
        "question": req.question,
        "answer": answer,
        "evaluation": report,
    }