from fastapi import APIRouter
from utils.query_wrapper import query_wrapper

router = APIRouter()
base_url = "/airports"

@router.get(f"{base_url}/get_airports_by_name")
def get_airports_by_name(airport_name:str):
    query = f'for airport in airports filter airport.name == "{airport_name}" return airport'
    results = query_wrapper(query)
    return results

@router.get(f"{base_url}/all_coming_flights_by_airport_name")
def all_coming_flights_by_airport_name(airport_name: str):
    query = f'let airportId = (for airport in airports filter airport.name == "{airport_name}" return airport._id)[0]'\
        f'for flight in flights filter airportId == flight._to return flight'
    results = query_wrapper(query)
    return results

@router.get(f"{base_url}/all_leaving_flights_by_airport_name")
def all_leaving_flights_by_airport_name(airport_name: str):
    query = f'let airportId = (for airport in airports filter airport.name == "{airport_name}" return airport._id)[0]'\
        f'for flight in flights filter airportId == flight._from return flight'
    results = query_wrapper(query)
    return results

@router.get(f"{base_url}/get_location_by_tail_number")
def get_location_by_tail_number(tail_number: str):
    query = f'for flight in flights filter flight.TailNum == "{tail_number}"'\
        f'return {{"TailNum": flight.TailNum, "Distance": flight.Distance}}'
    results  = query_wrapper(query)
    return results

           
