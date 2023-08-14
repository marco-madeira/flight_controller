import os
from arango import ArangoClient
from dotenv import load_dotenv
from api.airports.model import Airport
from api.flights.model import Flight

load_dotenv()
client  = ArangoClient(os.getenv("DATABASE_URL"))
db = client.db("Flights", username=os.getenv("DATABASE_USER"), password=os.getenv("DATABASE_PASSWORD"))


def query_wrapper(query: str):
    result = db.aql.execute(query)
    results_list  = list(result)
    # for index, data in enumerate(results):
    #     result_dic[index] = data 
    # print(result_dic)
    print(results_list)                  
    return results_list

def dic_to_airport(results_list: list) -> list[Airport]:
    airports = []
    for data in results_list:  
        airport = Airport(
            id=data["_id"],
            name=data["name"],
            city=data["city"],
            state=data["state"],
            lat=data["lat"],  
            long=data["long"],
        )
        airports.append(airport)
    return airports   

def dic_to_flight(results_list: list) -> list[Flight]:
    flights = []
    for data in results_list:    
        flight =  Flight(
            id = data["id"],
            flight_number=data["flightNum"],
            tail_number=data["tailNum"],
            flight_long=data["flightLong"],
            flight_lat=data["flightLat"],
            dep_long = data["depLong"],
            dep_lat = data["depLat"],
            arr_long = data["arrLong"],
            arr_lat=data["arrLat"],  
        )
        flights.append(flight)
    return flights     


