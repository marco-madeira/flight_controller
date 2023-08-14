// import { useGetFlightById } from "../core/network/queries/airport/queries";
// import { useUpdateFlightLocation } from "../core/network/queries/flight/mutations";

// export function fly(){
  
//        const flightId = ""
//        const flightId2 = ""
//        const flightId3 = ""
//        const flightId4 = ""

       
//        const {data: flight} = useGetFlightById(flightId);
//        const {data: flight2} = useGetFlightById(flightId2);
//        const {data: flight3} = useGetFlightById(flightId3);
//        const {data: flight4} = useGetFlightById(flightId4);
//        const {mutate: updateFlightLocation} = useUpdateFlightLocation();

//        const coordinates = getGeoPoints(
//         { long: flight?.long, lat: flight?.lat } as Coordinates,
//         { long: arrAirport?.long, lat: arrAirport?.lat } as Coordinates,
//         99
//       );
//       const [count, setCount] = useState(0);

//        const handleUpdateRoute = () => {
//         if (flight && flight2 && flight3 && flight4) {
//           updateFlightLocation({
//             flightId: flight.id,
//             long: coordinates[count].long,
//             lat: coordinates[count].lat,
//           });
//           updateFlightLocation({
//             flightId: flight2.id,
//             long: coordinates[count].long,
//             lat: coordinates[count].lat,
//           });
//           updateFlightLocation({
//             flightId: flight3.id,
//             long: coordinates[count].long,
//             lat: coordinates[count].lat,
//           });
//           updateFlightLocation({
//             flightId: flight4.id,
//             long: coordinates[count].long,
//             lat: coordinates[count].lat,
//           });
//           refetchFlight();
//           refetchNearAirports();
//           setCount(count + 1);
//         }
//       };
// }