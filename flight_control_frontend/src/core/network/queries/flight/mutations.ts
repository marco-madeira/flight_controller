import { useMutation } from "react-query";
import { FlightService } from "../../services/Flight";

export function useUpdateFlightLocation() {
  return useMutation(FlightService.updateFlightLocation);
}
