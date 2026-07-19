"""
memory_utils.py

Extracts structured memories from user messages.
"""

import re


class MemoryExtractor:

    def extract(self, message: str):

        message = message.strip()

        patterns = [

            (
                r"my name is (.+)",
                "personal",
                "name",
            ),

            (
                r"i am (.+)",
                "personal",
                "identity",
            ),

            (
                r"i'm (.+)",
                "personal",
                "identity",
            ),

            (
                r"i live in (.+)",
                "location",
                "city",
            ),

            (
                r"i study at (.+)",
                "education",
                "college",
            ),

            (
                r"i study (.+)",
                "education",
                "course",
            ),

            (
                r"my favourite language is (.+)",
                "preference",
                "favorite_language",
            ),

            (
                r"my favorite language is (.+)",
                "preference",
                "favorite_language",
            ),

            (
                r"i prefer (.+)",
                "preference",
                "preference",
            ),

            (
                r"i like (.+)",
                "preference",
                "likes",
            ),

            (
                r"i love (.+)",
                "preference",
                "likes",
            ),

        ]

        text = message.lower()

        for pattern, category, key in patterns:

            match = re.search(pattern, text)

            if match:

                value = match.group(1).strip()

                return {

                    "category": category,

                    "key": key,

                    "value": value,

                }

        return None