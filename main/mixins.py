import requests
from django.conf import settings

'''
Handles directions from Google
'''
def Directions(*args, **kwargs):
    lat_a = kwargs.get("lat_a")
    long_a = kwargs.get("long_a")
    lat_b = kwargs.get("lat_b")
    long_b = kwargs.get("long_b")

    origin = f'{lat_a},{long_a}'
    destination = f'{lat_b},{long_b}'

    params = {
        'origin': origin,
        'destination': destination,
        'key': settings.GOOGLE_API_KEY
    }

    try:
        result = requests.get('https://maps.googleapis.com/maps/api/directions/json', params=params)
        result.raise_for_status()
        directions = result.json()

        if directions.get("status") == "OK":
            route = directions["routes"][0]["legs"][0]
            origin = route["start_address"]
            destination = route["end_address"]
            distance = route["distance"]["text"]
            duration = route["duration"]["text"]
            steps = [
                [
                    s["distance"]["text"],
                    s["duration"]["text"],
                    s["html_instructions"],
                ]
                for s in route["steps"]
            ]
            
            return {
                "origin": origin,
                "destination": destination,
                "distance": distance,
                "duration": duration,
                "steps": steps
            }
        else:
            return None  # Return None if directions status is not "OK"
    except requests.RequestException as e:
        print(f"Error fetching directions: {e}")
        return None  # Return None in case of request exception
