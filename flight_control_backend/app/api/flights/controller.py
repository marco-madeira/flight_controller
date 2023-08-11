import os
from arango import ArangoClient
from dotenv import load_dotenv
from api.flights.model import Flight 
from fastapi import APIRouter
from utils.query_wrapper import query_wrapper

load_dotenv()
router = APIRouter()
client  = ArangoClient(os.getenv("DATABASE_URL"))
db = client.db("Flight", username="root", password="openSesame")
base_url = "/flights"

def update_flight_location(flight_id: str, distance: int):
    results = db.aql.execute(
        f'for flight in flights filter flight._id == "{flight_id}"'\
        f'update {{"_key": flight._key, "Distance": {distance}}} in flights'
    )
    return results

def create_flight(dep_airport_id: str, arr_airport_id: str, flight: Flight):
    results = db.aql.execute(
        f'insert {{"_from": "{dep_airport_id}", "_to": "{arr_airport_id}", ' 
        f'"TailNum": "{flight.tail_number}", "Distance": {flight.distance}, '
        f'"FlightNum": {flight.flight_number}, "Long": {flight.long}, '
        f'"Lat":{flight.lat}, "DepTime": {flight.dep_time}, "ArrTime": {flight.arr_time}}}'\
        f'into flights'    
    )

    return results

@router.get(f"{base_url}/get_airports_by_distance")
def get_airports_by_distance(flight_id: str, distance: int):
    query = f'let flight = (for flight in flights filter flight._id == "{flight_id}" return flight)[0]'\
         f'for airport in airports filter GEO_DISTANCE([flight.Long, flight.Lat], [airport.long, airport.lat]) <= {distance}'\
         f'return airport'
    results = query_wrapper(query)
    return results

