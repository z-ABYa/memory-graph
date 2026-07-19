"""
scraper.py

Responsible for downloading a webpage and extracting readable text.
"""

import requests
from bs4 import BeautifulSoup


def scrape_website(url: str) -> str:
    """
    Download webpage and extract readable text.
    """

    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/138.0 Safari/537.36"
            )
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        # Remove unwanted HTML tags
        for tag in soup(
            [
                "script",
                "style",
                "noscript",
                "header",
                "footer",
                "nav",
            ]
        ):
            tag.decompose()

        text = soup.get_text(separator="\n")

        return text

    except Exception as e:
        print(f"Error: {e}")
        return ""