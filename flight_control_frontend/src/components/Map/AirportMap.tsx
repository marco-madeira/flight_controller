import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { Coordinates } from "../../utils/GetGeoPoints";
import React from "react";
import {
  useGetAirportById,
  useGetAllAirports,
  useGetAllLeavingFlights,
  useGetFlightsInAirportRange,
} from "../../core/network/queries/airport/queries";
import { getGeoPoints } from "../../utils/GetGeoPoints";
import { useEffect, useState } from "react";
import { useUpdateFlightLocation } from "../../core/network/queries/flight/mutations";
import { Flight } from "../../core/models/Flight";
import { airplaneIcon, airportIcon } from "../../utils/Icons";
import { useGetFlightById } from "../../core/network/queries/flight/queries";

export function AirportMap() {
  const mapPosition = {
    long: -98.42357876374714,
    lat: 39.16221715834476,
  } as Coordinates;

  const airportId = "airports/PDX";
  const arrId = "airports/OGG";
  const flightId="flights/100031"

  const { data } = useGetAllAirports();
  const { data: airport } = useGetAirportById(airportId);
  const { data: flightsInRange, refetch } = useGetFlightsInAirportRange(airportId);

  const { data: arrAirport } = useGetAirportById(arrId);
  const [geoCount, setGeoCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const { mutate: updateFlightLocation } = useUpdateFlightLocation();
  const {data: flight} = useGetFlightById(flightId)

  // const handleUpdateRoute = () => {
  //   if (flightsInRange) {
  //     const flight = flightsInRange[flightCount];
  //     const points = getGeoLocation();

  //     updateFlightLocation({
  //       flightId: flight.id,
  //       long: points[geoCount].long,
  //       lat: points[geoCount].lat,
  //     });

  //     refetch();

  //     if (flightsInRange.length >= flightCount) {
  //       setFlightCount(0);
  //       setGeoCount(geoCount + 1);
  //     } else {
  //       setFlightCount(flightCount + 1);
  //     }
  //   }
  // };

  // const getGeoLocation = () => {
  //   if (arrAirport && airport) {
  //     return getGeoPoints(
  //       { long: airport.long, lat: airport.lat },
  //       { long: arrAirport.long, lat: arrAirport.lat },
  //       10
  //     );
  //   }
  //   return [{ long: 0, lat: 0 }];
  // };

  return (
    <div className="dashboard_div">
      <div className="controller_div">
        {flightsInRange &&
          flightsInRange.map((value, index) =>
            index < 4 ? (
              <div className="text_box" key={index}>
                <p>{`Nº do avião: ${value.tail_number}`}</p>
                <p>{`Longitude: ${value.flight_long}`}</p>
                <p>{`Latitude: ${value.flight_lat}`}</p>
                {/* <button>Solicitar Pouso</button> */}
              </div>
            ) : (
              <></>
            )
          )}
      </div>
      <div>
        {airport && (
          <MapContainer
            center={[airport.lat, airport.long]}
            zoom={8}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution="Map"
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg"
            />

            <Marker position={[airport.lat, airport.long]} icon={airportIcon} />
            <Circle center={[airport.lat, airport.long]} radius={50000} />

            {data &&
              data.map((value, index) => (
                <React.Fragment key={index}>
                  <Marker
                    position={[value.lat, value.long]}
                    icon={airportIcon}
                  />
                  <Circle center={[value.lat, value.long]} radius={50000} />
                </React.Fragment>
              ))}
            {/* {flightsInRange &&
              flightsInRange.map((value, index) => (
                <React.Fragment key={index}>
                  <Marker
                    position={[value.arr_lat, value.arr_long]}
                    icon={airplaneIcon}
                  />
                </React.Fragment>
              ))} */}
          </MapContainer>
        )}
      </div>
      <button>Atualizar Rotas</button>
    </div>
  );
}
