class Flight:
    def __init__(self,id: str, flight_number: int, 
                 tail_number: str, flight_long: float, flight_lat: float, 
                 dep_long: float, dep_lat: float, 
                 arr_long: float, arr_lat: float,            
        ):
        self.id = id
        self.flight_number = flight_number
        self.tail_number = tail_number
        self.flight_long = flight_long
        self.flight_lat = flight_lat
        self.dep_long = dep_long
        self.dep_lat = dep_lat
        self.arr_long = arr_long
        self.arr_lat = arr_lat
       
        