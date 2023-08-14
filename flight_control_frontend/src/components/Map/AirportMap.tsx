import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { Coordinates } from "../../utils/GetGeoPoints";
import React, { useCallback } from "react";
import {
  useGetAirportById,
  useGetAllAirports,
  useGetFlightsInAirportRange,
} from "../../core/network/queries/airport/queries";
import { getGeoPoints } from "../../utils/GetGeoPoints";
import { useEffect, useState } from "react";
import { useUpdateFlightLocation } from "../../core/network/queries/flight/mutations";
import { Flight } from "../../core/models/Flight";
import { airplaneIcon, airportIcon } from "../../utils/Icons";
import { useGetFlightById } from "../../core/network/queries/flight/queries";
import { AirportModal } from "../Modal/AirportModal";
import { useNavigate } from "react-router-dom";

export function AirportMap() {
  const mapPosition = {
    long: -98.42357876374714,
    lat: 39.16221715834476,
  } as Coordinates;

  const navigate = useNavigate();

  const airportId = "airports/105113";
  const flightId = "flights/107901";

  const airportId2 = "airports/106032";

  const { data: airport } = useGetAirportById(airportId);
  const { data: flightsInRange, refetch } =
    useGetFlightsInAirportRange(airportId);

  const { data: airport2 } = useGetAirportById(airportId2);
  const { data: flightsInRange2, refetch: refetch2 } =
    useGetFlightsInAirportRange(airportId2);

  const { data: flight } = useGetFlightById(flightId);
  const { mutate: updateFlightLocation } = useUpdateFlightLocation();
  const [count, setCount] = useState(0);
  const coordinates = flight
    ? getGeoPoints(
      { long: flight.depLong, lat: flight.depLat },
      { long: flight.arrLong, lat: flight.arrLat },
      499
    )
    : [{ long: 0, lat: 0 }];

  const handleUpdateRoute = useCallback(() => {
    if (flight) {
      updateFlightLocation({
        flightId: flight.id,
        long: coordinates[count].long,
        lat: coordinates[count].lat,
      });
      refetch();
      refetch2();
      setCount(count + 1);
    }
  }, [count, flight, coordinates, updateFlightLocation, refetch, refetch2]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateRoute();
    }, 75);

    return () => {
      clearInterval(interval);
    };
  }, [handleUpdateRoute]);

  const [openAirport, setOpenAirport] = useState(false);
  const handleOpenAirport = () => {
    setOpenAirport(!openAirport);
    console.log(airport);
  };

  return (
    <div className="dashboard_div">
      <div className="controller_div">
        {flightsInRange &&
          flightsInRange.map((value, index) =>
            index < 4 ? (
              <div className="text_box" key={index}>
                <p>{`Nº do avião: ${value.tailNum}`}</p>
                <p>{`Longitude: ${value.flightLong}`}</p>
                <p>{`Latitude: ${value.flightLat}`}</p>
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

            <Marker
              position={[airport.lat, airport.long]}
              icon={airportIcon}
              eventHandlers={{
                click: () => {
                  handleOpenAirport();
                },
              }}
            >
              <Popup>
                <AirportModal airport={airport} />
              </Popup>
            </Marker>
            <Circle center={[airport.lat, airport.long]} radius={50000} />
            {flightsInRange &&
              flightsInRange.map((value, index) => (
                <React.Fragment key={index}>
                  <Marker
                    position={[value.flightLat, value.flightLong]}
                    icon={airplaneIcon}
                  />
                </React.Fragment>
              ))}
            {airport2 && (
              <>
                <Marker
                  position={[airport2.lat, airport2.long]}
                  icon={airportIcon}
                >
                  <Popup>
                    <AirportModal airport={airport2} />
                  </Popup>
                </Marker>
                <Circle
                  center={[airport2.lat, airport2.long]}
                  radius={50000}
                  color="#ffffff"
                />
              </>
            )}
            {flightsInRange2 &&
              flightsInRange2.map((value, index) => (
                <React.Fragment key={index}>
                  <Marker
                    position={[value.flightLat, value.flightLong]}
                    icon={airplaneIcon}
                  />
                </React.Fragment>
              ))}
          </MapContainer>
        )}
      </div>
      <button onClick={() => navigate("/")}>Menu</button>

    </div>
  );
}
