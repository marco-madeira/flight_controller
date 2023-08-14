import { useQuery } from "react-query";
import { FlightService } from "../../services/Flight";


export function useGetFlightById(flightId: string){
    return useQuery(["getFlightById", flightId], ()=> FlightService.getFlightById(flightId))
}

export function useGetNearAirports(flightId:string, distance: number){
    return useQuery(["getNearAirports", flightId, distance], ()=>FlightService.getNearAirports(flightId, distance))  
}