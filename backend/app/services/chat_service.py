from app.rag.retriever import Retriever
from app.rag.prompt_builder import PromptBuilder
from app.llm.gemini import GeminiClient


class ChatService:

    def __init__(self):

        self.retriever = Retriever()
        self.prompt_builder = PromptBuilder()
        self.llm = GeminiClient()

    def chat(self, question: str):

        # Retrieve relevant documents
        documents = self.retriever.retrieve(question)

        # Build prompt
        prompt = self.prompt_builder.build_prompt(
            question=question,
            context=documents,
        )

        # Generate response
        answer = self.llm.generate_response(prompt)

        return {
            "answer": answer,
            "context": documents,
        }