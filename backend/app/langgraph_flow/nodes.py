"""
nodes.py

Workflow nodes used by LangGraph.
"""

from app.rag.hybrid_retriever import HybridRetriever
from app.rag.prompt_builder import PromptBuilder
from app.llm.gemini import GeminiClient
from app.memory.memory_manager import MemoryManager

retriever = HybridRetriever()
prompt_builder = PromptBuilder()
gemini = GeminiClient()
memory = MemoryManager()


def retrieve_context(state):

    state["context"] = retriever.retrieve(
        user_id=state["user_id"],
        question=state["question"],
    )

    return state


def build_prompt(state):

    state["prompt"] = prompt_builder.build_prompt(
        question=state["question"],
        retrieved_context=state["context"],
    )

    return state


def generate_answer(state):

    print("Prompt reached Gemini successfully.")


    state["answer"] = gemini.generate_response(
        state["prompt"]
    )

    return state


def save_memory(state):

    memory.save_memory(
        state["user_id"],
        state["question"],
    )

    return state