import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { Coordinates } from "../../utils/GetGeoPoints";
import React, { useCallback } from "react";
import { getGeoPoints } from "../../utils/GetGeoPoints";
import { useEffect, useState } from "react";
import { useUpdateFlightLocation } from "../../core/network/queries/flight/mutations";
import { Flight } from "../../core/models/Flight";
import {
  useGetFlightById,
  useGetNearAirports,
} from "../../core/network/queries/flight/queries";
import { airplaneIcon, airportIcon } from "../../utils/Icons";
import { FlightModal } from "../Modal/FlightModal";
import { AirportModal } from "../Modal/AirportModal";

export function AirplaneMap() {
  const flightId = "flights/107901";
  const flightId2 = "flights/108115";

  const { data: flight, refetch: refetchFlight } = useGetFlightById(flightId);
  const { data: getNearAirports, refetch: refetchNearAirports } =
    useGetNearAirports(flightId, 80000);
  const { mutate: updateFlightLocation } = useUpdateFlightLocation();
  const coordinates = flight
    ? getGeoPoints(
        { long: flight.depLong, lat: flight.depLat },
        { long: flight.arrLong, lat: flight.arrLat },
        499
      )
    : [{ long: 0, lat: 0 }];

  const [count, setCount] = useState(0);

  const { data: flight2, refetch: refetchFlight2 } =
    useGetFlightById(flightId2);
  const { data: getNearAirports2, refetch: refetchNearAirports2 } =
    useGetNearAirports(flightId2, 80000);
  const coordinates2 = flight2
    ? getGeoPoints(
        { long: flight2.depLong, lat: flight2.depLat },
        { long: flight2.arrLong, lat: flight2.arrLat },
        499
      )
    : [{ long: 0, lat: 0 }];

  const handleUpdateRoute = useCallback(() => {
    if (flight && flight2) {
      updateFlightLocation({
        flightId: flight.id,
        long: coordinates[count].long,
        lat: coordinates[count].lat,
      });
      updateFlightLocation({
        flightId: flight2.id,
        long: coordinates2[count].long,
        lat: coordinates2[count].lat,
      });
      refetchFlight();
      refetchNearAirports();
      refetchFlight2();
      refetchNearAirports2();
      setCount(count + 1);
    }
  }, [
    count,
    flight,
    coordinates,
    updateFlightLocation,
    refetchFlight,
    refetchNearAirports,
    flight2,
    coordinates2,
    refetchFlight2,
    refetchNearAirports2,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateRoute();
    }, 75);

    return () => {
      clearInterval(interval);
    };
  }, [handleUpdateRoute]);

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
              center={[flight.flightLat, flight.flightLong]}
              zoom={6}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="Map"
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg"
              />
              <Marker
                position={[flight.flightLat, flight.flightLong]}
                icon={airplaneIcon}
              >
                <Popup>
                  <FlightModal flight={flight} />
                </Popup>
              </Marker>
              <Circle
                center={[flight.flightLat, flight.flightLong]}
                radius={80000}
              ></Circle>
              {getNearAirports &&
                getNearAirports.map((value, index) => (
                  <React.Fragment key={index}>
                    <Marker
                      position={[value.lat, value.long]}
                      icon={airportIcon}
                    >
                      <Popup>
                        <AirportModal airport={value} />
                      </Popup>
                    </Marker>
                  </React.Fragment>
                ))}
              {flight2 && (
                <>
                  <Marker
                    position={[flight2.flightLat, flight2.flightLong]}
                    icon={airplaneIcon}
                  >
                    <Popup>
                      <FlightModal flight={flight2} />
                    </Popup>
                  </Marker>
                  <Circle
                    center={[flight2.flightLat, flight2.flightLong]}
                    radius={80000}
                    color="#ffffff"
                  ></Circle>
                  {getNearAirports2 &&
                    getNearAirports2.map((value, index) => (
                      <React.Fragment key={index}>
                        <Marker
                          position={[value.lat, value.long]}
                          icon={airportIcon}
                        >
                          <Popup>
                            <AirportModal airport={value} />
                          </Popup>
                        </Marker>{" "}
                      </React.Fragment>
                    ))}
                </>
              )}
            </MapContainer>
          </div>
          {/* <button onClick={handleUpdateRoute}>Iniciar viagem</button> */}
        </div>
      )}
    </>
  );
}
