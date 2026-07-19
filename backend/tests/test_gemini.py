from app.rag.retriever import Retriever
from app.rag.prompt_builder import PromptBuilder
from app.llm.gemini import GeminiClient


question = "What is FastAPI?"

retriever = Retriever()

chunks = retriever.retrieve(question)

builder = PromptBuilder()

prompt = builder.build_prompt(

    question,

    chunks,
)

gemini = GeminiClient()

response = gemini.generate_response(prompt)

print()

print("=" * 80)

print(response)

print("=" * 80)