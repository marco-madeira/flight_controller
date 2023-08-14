import { Airport } from "../../core/models/Airport";
import "./styles.css";

interface AirportModalProps {
  //  state: boolean;
  //  setState:(state:boolean) => void;
  airport: Airport;
}

export function AirportModal({ airport }: AirportModalProps) {
  return (
    <div className="modal">
      <p>{airport.name}</p>
      <p>{airport.city}</p>
      <p>{airport.state}</p>
      <p>{airport.lat}</p>
      <p>{airport.long}</p>
    </div>
  );
}
