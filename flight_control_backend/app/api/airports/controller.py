from fastapi import APIRouter
from pydantic import BaseModel
from utils.utils import query_wrapper, dic_to_airport, dic_to_flight

class Airport_Model (BaseModel):
    name : str
    city : str
    state : str
    country : str
    lat : float
    long : float 
    vip : bool

router = APIRouter()
base_url = "/airports"    

@router.get(f"{base_url}/getAllAirports")
def get_all_airport():
    query = f'for airport in airports return airport'
    results = query_wrapper(query)
    # data = dic_to_airport(results)
    return results
     
@router.get(f"{base_url}/getAirportById")
def get_airport_by_id(airport_id:str):
    query = f'for airport in airports filter airport._id == "{airport_id}" return airport'
    results = query_wrapper(query)
    data = dic_to_airport(results)[0]
    return data

@router.get(f"{base_url}/getFlightsInAirportRange")
def get_flights_in_airport_range(airport_id: str):
    query = (
        f'let airport = (for airport in airports filter airport._id == "{airport_id}" return airport)[0]'
        f'for flight in flights filter GEO_DISTANCE([airport.long, airport.lat],[flight.long, flight.lat]) <= 50000 '
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
    return results
