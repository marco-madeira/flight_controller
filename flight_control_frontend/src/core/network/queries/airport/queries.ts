import { useQuery } from "react-query";
import { AirportService } from "../../services/Airport";

export function useGetAllAirports(){
     return useQuery(["getAllAirports"], ()=> AirportService.getAllAirports())
}

export function useGetAirportById(airportId: string){
     return useQuery(["getAirportById", airportId], ()=> AirportService.getAirportById(airportId))
}

export function useGetAllLeavingFlights(airportId: string){
     return useQuery(["getAllLeavingFlights", airportId], ()=> AirportService.getAllLeavingFlights(airportId))
}

export function useGetFlightsInAirportRange(airportId:string){
     return useQuery(["getFlightsInAirportRange", airportId], ()=>AirportService.getFlightsInAirportRange(airportId))
}

