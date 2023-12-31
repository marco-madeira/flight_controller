import os
from typing import List
from arango import ArangoClient
from dotenv import load_dotenv
from pydantic import BaseModel
from api.flights.model import Flight 
from fastapi import APIRouter
from utils.utils import query_wrapper, dic_to_flight, dic_to_airport

load_dotenv()
router = APIRouter()
client  = ArangoClient(os.getenv("DATABASE_URL"))
db = client.db("Flights", username=os.getenv("DATABASE_USER"), password=os.getenv("DATABASE_PASSWORD"))
base_url = "/flights"

class Flight_Model(BaseModel):
    year: int
    month: int
    day: int
    day_of_weeek: str
    dep_time: int
    arr_time: int
    dep_time_utc: str
    arr_time_utc: str
    unique_carrier: str
    flight_number: int
    tail_number: str
    distance: int
    long: float
    lat: float

@router.get(f'{base_url}/getFlightById')
def get_flight_by_id(flight_id: str):
    query = (
        f'FOR flight IN flights FILTER flight._id == "{flight_id}" '
        'return {'
        '  id: flight._id,'
        '  tailNum: flight.tailNum,'
        '  flightNum: flight.flightNum,'
        '  flightLong: flight.long,'
        '  flightLat: flight.lat,'
        '  depLong: DOCUMENT(flight._from).long,'
        '  depLat: DOCUMENT(flight._from).lat,'
        '  arrLong: DOCUMENT(flight._to).long,'
        '  arrLat: DOCUMENT(flight._to).lat'
        '}'
    )
    results = query_wrapper(query)
    # data = dic_to_flight(results)
    return results[0]

@router.get(f'{base_url}/getFlightRoute')
def get_flight_route(flight_id: str):
    query = f'for flight in flights filter flight._id == "{flight_id}"'

@router.put(f'{base_url}/updateFlightLocation')
def update_flight_location(flight_id: str, long: float, lat: float ):
    results = db.aql.execute(
        f'for flight in flights filter flight._id == "{flight_id}"'\
        f'update {{"_key": flight._key, "long": {long}, "lat": {lat}}} in flights'
    )
    return results

@router.get(f"{base_url}/getNearAirports")
def get_near_airports(flight_id: str, distance: int):
    query = f'let flight = (for flight in flights filter flight._id == "{flight_id}" return flight)[0]'\
         f'for airport in airports filter GEO_DISTANCE([flight.long, flight.lat], [airport.long, airport.lat]) <= {distance}'\
         f'return airport'
    results = query_wrapper(query)
    data = dic_to_airport(results)
    return data

@router.post(f'{base_url}/createFlight')
def create_flight(dep_airport_id: str, arr_airport_id: str, tail_num: str, flight_num: int, long: float, lat: float):
    query = (
        f'insert {{"_from": "{dep_airport_id}", "_to": "{arr_airport_id}", ' 
        f'"tailNum": "{tail_num}", '
        f'"flightNum": {flight_num}, "long": {long}, '
        f'"lat": {lat}}} '
        f'into flights'
    )
    results = db.aql.execute(query)
    return results



