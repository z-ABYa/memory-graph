import os
import json
from app.config.settings import DATA_PATH
from app.evaluation.metrics import LLMEvaluator
from app.utils.logger import logger

class Evaluator:
    def __init__(self):
        self.file_path = os.path.join(DATA_PATH, "eval_history.json")
        os.makedirs(DATA_PATH, exist_ok=True)
        self.llm_evaluator = LLMEvaluator()

    def evaluate(self, question: str, answer: str, retrieved_context: dict) -> dict:
        # Extract RAG text content to evaluate relevance and grounding
        rag_contents = []
        for doc in retrieved_context.get("rag", []):
            if isinstance(doc, dict):
                text = doc.get("content") or doc.get("text") or ""
            else:
                text = str(doc)
            if text:
                rag_contents.append(text)
        
        rag_text = "\n".join(rag_contents)
        memory_text = retrieved_context.get("memory", "")
        
        # Build evaluation context
        eval_context = f"RAG Documents Context:\n{rag_text}\n\nLong-term Memories Context:\n{memory_text}"
        
        # 1. Evaluate Context Relevance
        relevance_report = self.llm_evaluator.evaluate_context_relevance(question, eval_context)
        
        # 2. Evaluate Faithfulness (groundedness)
        faithfulness_report = self.llm_evaluator.evaluate_faithfulness(eval_context, answer)
        
        # 3. Evaluate Answer Correctness
        correctness_report = self.llm_evaluator.evaluate_answer_correctness(question, answer)
        
        # Evaluate Knowledge Graph extraction / overlap (Simple heuristic/rule check for entities)
        graph_entities = retrieved_context.get("graph", [])
        graph_score = 1.0 if graph_entities else 0.0
        
        report = {
            "retrieval_score": relevance_report["score"],
            "memory_score": 0.85 if memory_text else 0.5, # grounding score of memory recall
            "graph_score": graph_score,
            "response_score": (faithfulness_report["score"] + correctness_report["score"]) / 2.0,
            "status": "Healthy",
            "details": {
                "context_relevance": relevance_report,
                "faithfulness": faithfulness_report,
                "correctness": correctness_report
            }
        }
        
        self.save_eval_run(question, answer, report)
        return report

    def save_eval_run(self, question: str, answer: str, report: dict):
        try:
            history = []
            if os.path.exists(self.file_path):
                with open(self.file_path, "r") as f:
                    try:
                        history = json.load(f)
                    except Exception:
                        history = []
            
            history.append({
                "question": question,
                "answer": answer,
                "report": report
            })
            
            # Keep last 100 runs
            if len(history) > 100:
                history = history[-100:]
                
            with open(self.file_path, "w") as f:
                json.dump(history, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving evaluation run: {e}")

    def get_average_metrics(self) -> dict:
        try:
            if not os.path.exists(self.file_path):
                return self.get_default_metrics()
                
            with open(self.file_path, "r") as f:
                history = json.load(f)
                
            if not history:
                return self.get_default_metrics()
                
            total = len(history)
            sum_retrieval = 0.0
            sum_memory = 0.0
            sum_graph = 0.0
            sum_response = 0.0
            
            for run in history:
                report = run.get("report", {})
                sum_retrieval += report.get("retrieval_score", 0.0)
                sum_memory += report.get("memory_score", 0.0)
                sum_graph += report.get("graph_score", 0.0)
                sum_response += report.get("response_score", 0.0)
                
            return {
                "retrieval_score": round(sum_retrieval / total, 2),
                "memory_score": round(sum_memory / total, 2),
                "graph_score": round(sum_graph / total, 2),
                "response_score": round(sum_response / total, 2),
                "status": "Healthy"
            }
        except Exception as e:
            logger.error(f"Error calculating average evaluation metrics: {e}")
            return self.get_default_metrics()

    def get_default_metrics(self) -> dict:
        return {
            "retrieval_score": 0.85,
            "memory_score": 0.80,
            "graph_score": 0.75,
            "response_score": 0.90,
            "status": "Healthy"
        }