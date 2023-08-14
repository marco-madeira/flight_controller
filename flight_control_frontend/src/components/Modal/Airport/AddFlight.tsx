import { useState } from "react";
import { Airport } from "../../../core/models/Airport";
import { useCreateFlight } from "../../../core/network/queries/flight/mutations";
import { CreateFlightDTO } from "../../../core/network/services/Flight";
import "../styles.css";

interface AirportModalProps {
  //  state: boolean;
  //  setState:(state:boolean) => void;
  airport: Airport;
}

export function AddFlightModal({ airport }: AirportModalProps) {
  const { mutate: createFlight } = useCreateFlight();
  const [flight, setFlight] = useState({
    depAirportId: airport ? airport._id : "",
    arrAirportId: "",
    tailNum: "",
    flightNum: "",
    long: airport.long,
    lat: airport.lat,
  } as CreateFlightDTO);

  const handleUpdate = () => {
    createFlight(flight);
  };

  return (
    <div className="modal">
      <input
        className="input"
        type="text"
        placeholder="Destino"
        onChange={(e) => setFlight({ ...flight, arrAirportId: e.target.value })}
      ></input>
      <input
        className="input"
        type="text"
        placeholder="Nº do avião"
        onChange={(e) => setFlight({ ...flight, tailNum: e.target.value })}
      ></input>
      <input
        className="input"
        type="text"
        placeholder="Nº do vôo"
        onChange={(e) => setFlight({ ...flight, flightNum: e.target.value })}
      ></input>
      <div>
        <button className="confirm_button" onClick={handleUpdate}>Confirmar</button>
      </div>
    </div>
  );
}
