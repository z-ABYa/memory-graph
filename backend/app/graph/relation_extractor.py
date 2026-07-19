"""
relation_extractor.py
"""


class RelationExtractor:

    def extract(

        self,

        user_id,

        entities,

    ):

        relations = []

        for entity in entities:

            relations.append(

                {

                    "source": user_id,

                    "relation": entity["key"].upper(),

                    "target": entity["value"],

                    "type": entity["type"],

                }

            )

        return relations