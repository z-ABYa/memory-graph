"""
gemini.py

Handles Gemini API communication.
"""

import time

from google import genai

from app.config.settings import (
    GEMINI_API_KEY,
    MODEL_NAME,
)


class GeminiClient:

    def __init__(self):

        self.client = genai.Client(
            api_key=GEMINI_API_KEY
        )

    def generate_response(
        self,
        prompt: str,
    ) -> str:

        retries = 3

        for attempt in range(retries):

            try:

                response = self.client.models.generate_content(

                    model=MODEL_NAME,

                    contents=prompt,

                )

                return response.text

            except Exception as e:

                print(f"Gemini Error (Attempt {attempt+1}): {e}")

                time.sleep(2)

        return (
            "Sorry, Gemini is currently unavailable. "
            "Please try again in a few moments."
        )