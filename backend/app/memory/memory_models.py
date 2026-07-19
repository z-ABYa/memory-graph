"""
memory_models.py
"""

from datetime import datetime


class Memory:

    def __init__(

        self,

        user_id,

        category,

        key,

        value,

    ):

        self.user_id = user_id

        self.category = category

        self.key = key

        self.value = value

        self.created_at = datetime.utcnow()

    def to_dict(self):

        return {

            "user_id": self.user_id,

            "category": self.category,

            "key": self.key,

            "value": self.value,

            "created_at": self.created_at,

        }