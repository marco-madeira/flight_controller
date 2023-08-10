import os
from arango import ArangoClient
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()
app = FastAPI()
client  = ArangoClient(os.getenv("DATABASE_URL"))
db = client.db("Flight", username="root", password="openSesame")
base_url = "/airports"

@app.get(f"{base_url}/get_airports_by_name")
def get_airports_by_name(airport_name:str):
    results = db.aql.execute(
    f'for airport in airports filter airport.name == "{airport_name}" return airport')

    return results

@app.get(f"{base_url}/all_coming_flights_by_airport_name")
def all_coming_flights_by_airport_name(airport_name: str):
    results = db.aql.execute(
        f'let airportId = (for airport in airports filter airport.name == "{airport_name}" return airport._id)[0]'\
        f'for flight in flights filter airportId == flight._to return flight'
    )

    return results

@app.get(f"{base_url}/all_leaving_flights_by_airport_name")
def all_leaving_flights_by_airport_name(airport_name: str):
    results = db.aql.execute(
        f'let airportId = (for airport in airports filter airport.name == "{airport_name}" return airport._id)[0]'\
        f'for flight in flights filter airportId == flight._from return flight'
    )

    return results

@app.get(f"{base_url}/get_location_by_tail_number")
def get_location_by_tail_number(tail_number: str):
    results = db.aql.execute(
        f'for flight in flights filter flight.TailNum == "{tail_number}"'\
        f'return {{"TailNum": flight.TailNum, "Distance": flight.Distance}}'
    )

    return results

