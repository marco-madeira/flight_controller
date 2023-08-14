import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { Coordinates } from "../../utils/GetGeoPoints";
import React from "react";
import { getGeoPoints } from "../../utils/GetGeoPoints";
import { useEffect, useState } from "react";
import { useUpdateFlightLocation } from "../../core/network/queries/flight/mutations";
import { Flight } from "../../core/models/Flight";
import { useGetFlightById, useGetNearAirports } from "../../core/network/queries/flight/queries";
import { airplaneIcon, airportIcon } from "../../utils/Icons";

export function AirplaneMap() {
  const flightId = "flights/100031";

  const { data: flight, refetch: refetchFlight } = useGetFlightById(flightId);
  const { data: getNearAirports, refetch: refetchNearAirports } =
    useGetNearAirports(flightId, 50000);
  const { mutate: updateFlightLocation } = useUpdateFlightLocation();
  const coordinates = flight ? getGeoPoints({long: flight.flight_long, lat: flight.flight_lat} ,
    {long: flight.arr_long, lat: flight.arr_lat}, 10) : [{long: 0, lat: 0}]
  const [count, setCount] = useState(0);

  const handleUpdateRoute = () => {
    if (flight) {
      updateFlightLocation({
        flightId: flight.id,
        long: coordinates[count].long,
        lat: coordinates[count].lat,
      });
      refetchFlight();
      refetchNearAirports();
      setCount(count + 1);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //   }, 3000);
  //   return () => {
  //     handleUpdateRoute();
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <>
      {flight && (
        <div className="dashboard_div">
          <div className="controller_div">
            {getNearAirports &&
              getNearAirports.map((value, index) =>
                index < 4 ? (
                  <div className="text_box" key={index}>
                    <p>{`Nome aeroporto: ${value.name}`}</p>
                    <p>{`Longitude aeroporto: ${value.long}`}</p>
                    <p>{`Latitude aeroporto: ${value.lat}`}</p>
                  </div>
                ) : (
                  <></>
                )
              )}
          </div>
          <div>
            <MapContainer
              center={[flight.flight_lat, flight.flight_long]}
              zoom={6}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="Map"
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg"
              />
              <Marker
                position={[flight.flight_lat, flight.flight_long]}
                icon={airplaneIcon}
              />
              <Circle
                center={[flight.flight_lat, flight.flight_long]}
                radius={50000}
              ></Circle>
              {getNearAirports &&
                getNearAirports.map((value, index) => (
                  <React.Fragment key={index}>
                    <Marker
                      position={[value.lat, value.long]}
                      icon={airportIcon}
                    />
                  </React.Fragment>
                ))}
            </MapContainer>
          </div>
          <button onClick={handleUpdateRoute}>Iniciar viagem</button>
        </div>
      )}
    </>
  );
}
