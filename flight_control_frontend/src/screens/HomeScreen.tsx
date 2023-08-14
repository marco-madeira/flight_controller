import { useState } from "react";
import { AirportMap } from "../components/Map/AirportMap";
import { AirplaneMap } from "../components/Map/Airplane";

export default function Home() {
  const [state, setState] = useState(false);

  return (
    <>
      {!state ? <AirportMap /> : <AirplaneMap />}
      <button onClick={() => setState(!state)}>Trocar Visão</button>
    </>
  );
}
