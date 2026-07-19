"""
entity_extractor.py
"""

from app.memory.memory_utils import MemoryExtractor


class EntityExtractor:

    def __init__(self):

        self.extractor = MemoryExtractor()

    def extract(

        self,

        text,

    ):

        memory = self.extractor.extract(text)

        if memory is None:

            return []

        return [

            {

                "type": memory["category"],

                "key": memory["key"],

                "value": memory["value"],

            }

        ]