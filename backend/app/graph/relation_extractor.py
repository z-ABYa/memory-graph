import json
import re
from app.llm.gemini import GeminiClient
from app.utils.logger import logger

class RelationExtractor:
    def __init__(self):
        self.gemini = GeminiClient()

    def extract(self, user_id: str, text: str) -> list:
        if not text or not text.strip():
            return []
            
        prompt = f"""You are an expert knowledge graph builder. Extract semantic relationships/triples from the following text.
Text: {text}
The active user is: '{user_id}'

Instructions:
1. If the text contains personal statements, preferences, or facts about the active user (e.g. "I live in Paris", "My favorite language is Python", "i study physics"), map 'I', 'me', 'my' to '{user_id}' as the source entity with source_type 'USER'.
2. For general statements (e.g. "Python is a coding language", "Paris is the capital of France"), extract the general relationships between the entities.
3. Identify relationship types (e.g. LIVES_IN, FAVORITE_LANGUAGE, CAPITAL_OF, SUBSET_OF, WORKS_AT, MEMBER_OF, RELATED_TO).
4. Provide categories/types for both source and target entities (e.g., USER, PERSON, LOCATION, TECHNOLOGY, CONCEPT, ORGANIZATION, EDUCATION).

Provide the output as a JSON list of objects:
[
  {{
    "source": "source entity",
    "source_type": "source entity category",
    "relation": "relationship type",
    "target": "target entity",
    "target_type": "target entity category"
  }}
]
Keep relationship types short, uppercase, and clean. Keep entity names normalized.
Do not include any other text, return only the JSON list."""

        try:
            response_text = self.gemini.generate_response(prompt)
            cleaned = response_text.strip()
            if "```json" in cleaned:
                cleaned = cleaned.split("```json")[1].split("```")[0].strip()
            elif "```" in cleaned:
                cleaned = cleaned.split("```")[1].split("```")[0].strip()
            
            json_match = re.search(r"\[.*\]", cleaned, re.DOTALL)
            if json_match:
                cleaned = json_match.group(0)
            
            relations = json.loads(cleaned)
            return relations
        except Exception as e:
            logger.error(f"Failed to extract relations with Gemini: {e}")
            return []