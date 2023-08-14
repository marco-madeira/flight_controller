import { api } from "../../api";
import { Airport } from "../../models/Airport";
import { Flight } from "../../models/Flight"

export type updateLocation = {
    flightId: string;
    long: number;
    lat: number
}

const baseUrl = "/flights"

const getFlightById = async(flightId: string): Promise<Flight> =>{
     const url = `${baseUrl}/getFlightById?flight_id=${flightId}`;
     const res = await api.get<Flight>(url)
     return res.data
}

export async function getNearAirports(flightId: string, distance: number): Promise<Airport[]>{
    const url = `${baseUrl}/getNearAirports?flight_id=${flightId}&distance=${distance}`
    const res = await api.get(url)
    return res.data
}

export async function updateFlightLocation(up: updateLocation): Promise<Flight>{
    const url = `${baseUrl}/updateFlightLocation?flight_id=${up.flightId}&long=${up.long}&lat=${up.lat}`
    const res = await api.put(url)
    return res.data
}

export const FlightService = {
    getFlightById, 
    updateFlightLocation,
    getNearAirports
}