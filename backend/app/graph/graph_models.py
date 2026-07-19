"""
graph_models.py

Graph data models.
"""


class Entity:

    def __init__(
        self,
        entity_type,
        value,
    ):

        self.entity_type = entity_type
        self.value = value

    def to_dict(self):

        return {

            "type": self.entity_type,

            "value": self.value,

        }


class Relationship:

    def __init__(

        self,

        source,

        relation,

        target,

    ):

        self.source = source
        self.relation = relation
        self.target = target

    def to_dict(self):

        return {

            "source": self.source,

            "relation": self.relation,

            "target": self.target,

        }