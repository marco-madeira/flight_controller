
import { Flight } from "../../core/models/Flight";
import "./styles.css";

interface AirportModalProps {
  //  state: boolean;
  //  setState:(state:boolean) => void;
  flight: Flight;
}

export function FlightModal({ flight }: AirportModalProps) {
  return (
    <div className="modal">
      <p>{flight.tailNum}</p>
      <p>{flight.flightNum}</p>
      <p>{flight.arrLong}</p>
      <p>{flight.arrLong}</p>
    </div>
  );
}