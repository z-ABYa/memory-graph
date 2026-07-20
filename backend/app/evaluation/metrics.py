import json
import re
from app.llm.gemini import GeminiClient
from app.utils.logger import logger

class LLMEvaluator:
    def __init__(self):
        self.gemini = GeminiClient()

    def _parse_score_response(self, response_text: str) -> dict:
        """Parses the score and reason from Gemini's response, handling markdown code blocks."""
        try:
            # Clean markdown formatting if present
            cleaned = response_text.strip()
            if "```json" in cleaned:
                cleaned = cleaned.split("```json")[1].split("```")[0].strip()
            elif "```" in cleaned:
                cleaned = cleaned.split("```")[1].split("```")[0].strip()
            
            # Find the first JSON-like structure
            json_match = re.search(r"\{.*\}", cleaned, re.DOTALL)
            if json_match:
                cleaned = json_match.group(0)
            
            data = json.loads(cleaned)
            return {
                "score": float(data.get("score", 0.0)),
                "reason": str(data.get("reason", "No reason provided."))
            }
        except Exception as e:
            logger.error(f"Failed to parse LLM evaluation response: {response_text}. Error: {e}")
            return {"score": 0.5, "reason": "Failed to parse evaluator response."}

    def evaluate_context_relevance(self, question: str, context: str) -> dict:
        """Evaluates how relevant the retrieved context is to the user's question."""
        if not context.strip():
            return {"score": 0.0, "reason": "Retrieved context is empty."}
            
        prompt = f"""You are an AI system evaluator. Rate the relevance of the retrieved context to the user's question.
Question: {question}
Context: {context}

Rate how helpful and relevant the context is to answer the question.
Output a score between 0.0 (completely irrelevant) and 1.0 (contains all necessary details to answer the question).
Provide your evaluation in the following JSON format:
{{"score": <float>, "reason": "<string>"}}
Do not include any other text in your response. Only return valid JSON."""

        res = self.gemini.generate_response(prompt)
        return self._parse_score_response(res)

    def evaluate_faithfulness(self, context: str, answer: str) -> dict:
        """Evaluates if the answer is grounded ONLY in the retrieved context."""
        if not context.strip():
            return {"score": 0.0, "reason": "No context was provided to verify the answer against."}
            
        prompt = f"""You are an AI system evaluator. Rate the faithfulness of the generated answer based ONLY on the retrieved context.
Context: {context}
Answer: {answer}

Rate whether the generated answer contains statements not supported by the context (hallucinations).
Output a score between 0.0 (completely ungrounded or contains hallucinations) and 1.0 (perfectly faithful, all statements are supported by the context).
Provide your evaluation in the following JSON format:
{{"score": <float>, "reason": "<string>"}}
Do not include any other text in your response. Only return valid JSON."""

        res = self.gemini.generate_response(prompt)
        return self._parse_score_response(res)

    def evaluate_answer_correctness(self, question: str, answer: str) -> dict:
        """Evaluates the overall correctness and completeness of the answer to the question."""
        prompt = f"""You are an AI system evaluator. Rate the correctness and completeness of the generated answer to the question.
Question: {question}
Answer: {answer}

Rate how well the answer resolves the question.
Output a score between 0.0 (completely incorrect, incomplete, or off-topic) and 1.0 (perfectly correct and complete).
Provide your evaluation in the following JSON format:
{{"score": <float>, "reason": "<string>"}}
Do not include any other text in your response. Only return valid JSON."""

        res = self.gemini.generate_response(prompt)
        return self._parse_score_response(res)
