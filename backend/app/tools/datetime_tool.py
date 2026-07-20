from datetime import datetime

def get_current_datetime() -> str:
    """Returns the current date and time formatted nicely."""
    now = datetime.now()
    return f"Current date and time: {now.strftime('%A, %B %d, %Y at %I:%M %p')}"
