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
    query = f'for airport in airports2 return airport'
    results = query_wrapper(query)
    data = dic_to_airport(results)
    return data
     
@router.get(f"{base_url}/get_airport_by_id")
def get_airport_by_id(airport_id:str):
    query = f'for airport in airports filter airport._id == "{airport_id}" return airport'
    results = query_wrapper(query)
    data = dic_to_airport(results)[0]
    return data

@router.get(f"{base_url}/getFlightsInAirportRange")
def get_flights_in_airport_range(airport_id: str):
    query = (
        f'let airport = (for airport in airports filter airport._id == "{airport_id}" return airport)[0]'
        f'for flight in flights filter GEO_DISTANCE([airport.long, airport.lat],[flight.Long, flight.Lat]) <= 50000 '
        'return {'
        '  id: flight._id,'
        '  tailNum: flight.TailNum,'
        '  flightNum: flight.FlightNum,'
        '  flightLong: flight.Long,'
        '  flightLat: flight.Lat,'
        '  depLong: DOCUMENT(flight._from).long,'
        '  depLat: DOCUMENT(flight._from).lat,'
        '  arrLong: DOCUMENT(flight._to).long,'
        '  arrLat: DOCUMENT(flight._to).lat'
        '}'
    )
    results = query_wrapper(query)
    return results

# @router.get(f"{base_url}/mudarmudar")
# def all_leaving_flights_by_airport_id(airport_id: str, distance: int):
#     query = (
#         f'let airport = (for airport in airports filter airport._id == "{airport_id}" return airport)[0] '
#         f'for flight in flights '
#         f'filter GEO_DISTANCE([airport.long, airport.lat], [flight.Long, flight.Lat]) <= {distance} '
#         'return flight'
#     )
#     results = query_wrapper(query)
#     data = dic_to_flight(results)
#     return data

@router.get(f"{base_url}/all_coming_flights_by_airport_name")
def all_coming_flights_by_airport_id(airport_id: str):
    query = f'let airportId = (for airport in airports filter airport._id == "{airport_id}" return airport._id)[0]'\
        f'for flight in flights filter airportId == flight._to return flight'
    results = query_wrapper(query)
    return results

@router.get(f"{base_url}/get_all_leaving_flights_by_airport_id")
def get_all_leaving_flights_by_airport_id(airport_id: str):
    query = (
        f'for flight in flights '
        f'filter DOCUMENT(flight._from)._id== "{airport_id}" && flight.TakeOff == true '
        'return flight'
    )
    results = query_wrapper(query)
    data = dic_to_flight(results)
    return data
           
