from api.flights.controller import get_airports_by_distance
from api.flights.model import Flight

flight = get_airports_by_distance("flights/1000", 500000)    
for f in flight: 
  print(f)