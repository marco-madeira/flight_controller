import { useState } from "react";
import { AirportMap } from "../components/Map/AirportMap";
import { AirplaneMap } from "../components/Map/Airplane";
import { Map } from "../components/Map";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {!state ? <Map/>: <AirplaneMap />}
      <button onClick={() => navigate("/")}>Menu</button>
      <button onClick={() => navigate("/flightMap")}>Voôs</button>
      <button onClick={() => navigate("/airportMap")}>Aeroportos</button>
    </>
  );
}
