// import { MapContainer, Marker, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "./styles.css";
// import { Coordinates } from "../../utils/GetGeoPoints";
// import React from "react";
// import {
//   useGetAirportById,
//   useGetAllLeavingFlights,
// } from "../../core/network/queries/airport/queries";
// import { getGeoPoints } from "../../utils/GetGeoPoints";
// import { useEffect, useState } from "react";
// import { useUpdateFlightLocation } from "../../core/network/queries/flight/mutations";
// import { Flight } from "../../core/models/Flight";

// export function Map() {
//   const mapPosition = {
//     long: -98.42357876374714,
//     lat: 39.16221715834476,
//   } as Coordinates;

//   const airportId = "airports/PDX";
//   const arrId = "airports/OGG"

//   const { data: airport } = useGetAirportById(airportId);
//   const { data: leavingFlights, refetch } = useGetAllLeavingFlights(airportId);
//   const { data: arrAirport} = useGetAirportById(arrId)
//   const [geoCount, setGeoCount] = useState(0);
//   const [flightCount, setFlightCount] = useState(0);
//   const { mutate: updateFlightLocation } = useUpdateFlightLocation();

//   const handleUpdateRoute = () => {
//     if (leavingFlights) {
//       const flight = leavingFlights[flightCount];
//       const points = getGeoLocation();

//       updateFlightLocation({
//         flightId: flight.id,
//         long: points[geoCount].long,
//         lat: points[geoCount].lat,
//       });

//       if (leavingFlights.length >= flightCount) {
//         setFlightCount(0);
//         setGeoCount(geoCount+1)
//       } else {
//         setFlightCount(flightCount + 1);
//       }
//     }
//   };

//   // const handleSetCount = () =>{}

//   useEffect(() => {
//      refetch()
//   }, [handleUpdateRoute]);

//   const getGeoLocation = () => {
//     if (arrAirport && airport) {
//       return getGeoPoints(
//         { long: airport.long, lat: airport.lat },
//         { long: arrAirport.long, lat: arrAirport.lat },
//         10
//       );
//     }
//     return [{ long: 0, lat: 0 }];
//   };

//   return (
//     <div className="dashboard_div">
//       <div className="controller_div">Teste</div>
//       <div>
//         <MapContainer
//           center={[mapPosition.lat, mapPosition.long]}
//           zoom={4}
//           scrollWheelZoom={false}
//         >
//           <TileLayer
//             attribution="Map"
//             url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg"
//           />
//           {airport && <Marker position={[airport.lat, airport.long]} />}
//           {leavingFlights &&
//             leavingFlights.map((value, index) => (
//               <React.Fragment key={index}>
//                 <Marker position={[value.flightLat, value.flightLong]} />
//               </React.Fragment>
//             ))}
//         </MapContainer>
//       </div>
//       <button onClick={handleUpdateRoute}>Atualizar Rotas</button>
//     </div>
//   );
// }
