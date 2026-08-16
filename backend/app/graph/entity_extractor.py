import json
import re
from app.llm.gemini import GeminiClient
from app.utils.logger import logger

class EntityExtractor:
    def __init__(self):
        self.gemini = GeminiClient()

    def extract(self, text: str) -> list:
        if not text or not text.strip():
            return []
            
        prompt = f"""You are an expert knowledge graph engineer. Extract key entities from the following text.
Text: {text}

Extract the most important entities (such as people, organizations, locations, concepts, products, events, technologies, academic fields, or key nouns).
For each entity, determine its category/type (e.g. PERSON, ORGANIZATION, LOCATION, CONCEPT, TECHNOLOGY, COURSE, PREFERENCE, etc.).
Output your response as a JSON list of objects:
[
  {{"type": "CATEGORY", "key": "normalized_name", "value": "display_name"}}
]
Keep keys lowercase, using underscores instead of spaces (e.g., "artificial_intelligence", "paris").
Do not include any formatting other than JSON. Return only the JSON list."""

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
            
            entities = json.loads(cleaned)
            return entities
        except Exception as e:
            logger.error(f"Failed to extract entities with Gemini: {e}")
            return []