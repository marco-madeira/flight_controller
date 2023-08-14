import { api } from "../../api";
import { Airport } from "../../models/Airport";
import { Flight } from "../../models/Flight";

const baseUrl = "/airports";

const getAllAirports = async (): Promise<Airport[]> => {
  const url = `${baseUrl}/getAllAirports`;
  const res = await api.get<Airport[]>(url);
  return res.data;
};

const getAirportById = async (airportId: string): Promise<Airport> => {
  const url = `${baseUrl}/get_airport_by_id?airport_id=${airportId}`;
  const res = await api.get<Airport>(url);
  return res.data;
};

const getAllLeavingFlights = async (airportId: string): Promise<Flight[]> => {
  const url = `${baseUrl}/get_all_leaving_flights_by_airport_id?airport_id=${airportId}`;
  const res = await api.get<Flight[]>(url);
  return res.data;
};

export async function getFlightsInAirportRange(airportId: string): Promise<Flight[]>{
  const url=`${baseUrl}/getFlightsInAirportRange?airport_id=${airportId}`;
  const res = await api.get<Flight[]>(url);
  return res.data
}


export const AirportService = {
  getAllAirports,
  getAirportById,
  getAllLeavingFlights,
  getFlightsInAirportRange
};
