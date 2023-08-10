class Flight:
    def __init__(self, tail_number: str, distance: int, 
                 flight_number: int, long: int, lat: int, 
                 dep_time: int, arr_time: int
        ):
        self.tail_number = tail_number
        self.distance = distance
        self.flight_number = flight_number
        self.long = long
        self.lat = lat
        self.dep_time = dep_time
        self.arr_time = arr_time
        