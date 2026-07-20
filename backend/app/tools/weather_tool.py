import requests

def get_weather(city: str) -> str:
    """Fetches real-time weather using Open-Meteo API, falling back to a mock response if offline."""
    # Mock data fallback
    mock_weather = {
        "london": "mild and drizzling, 16°C",
        "paris": "clear and sunny, 21°C",
        "new york": "warm with partial clouds, 26°C",
        "tokyo": "humid with light rain, 24°C",
        "sydney": "cool and windy, 14°C",
        "delhi": "hot and humid, 34°C"
    }
    
    city_lower = city.strip().lower()
    
    try:
        # Try to resolve city coordinates and fetch from Open-Meteo API (requires network)
        # We search coordinates using geocoding API
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=en&format=json"
        res = requests.get(geo_url, timeout=3)
        if res.status_code == 200 and res.json().get("results"):
            loc = res.json()["results"][0]
            lat, lon = loc["latitude"], loc["longitude"]
            name = loc["name"]
            country = loc.get("country", "")
            
            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
            w_res = requests.get(weather_url, timeout=3)
            if w_res.status_code == 200:
                current = w_res.json()["current_weather"]
                temp = current["temperature"]
                wind = current["windspeed"]
                return f"The current weather in {name}, {country} is {temp}°C with a wind speed of {wind} km/h."
                
    except Exception:
        # Silently fall back to mock
        pass
        
    for k, v in mock_weather.items():
        if k in city_lower:
            return f"The weather in {city.title()} is currently {v} (offline fallback)."
            
    return f"The weather in {city.title()} is estimated to be around 22°C with clear skies (offline fallback)."
