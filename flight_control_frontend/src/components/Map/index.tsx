import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import { Coordinates } from "../../utils/GetGeoPoints";
import { useGetAllAirports } from "../../core/network/queries/airport/queries";
import { airportIcon } from "../../utils/Icons";
import { AirportModal } from "../Modal/AirportModal";
import { AddFlightModal } from "../Modal/Airport/AddFlight";

export function Map() {
  const mapPosition = {
    long: -77.27622346973759,
    lat: 36.65336287663821,
  } as Coordinates;

  const { data: airports } = useGetAllAirports();

  return (
    <div className="dashboard_div">
      <div className="controller_div">
        Teste
      </div>
      <div>
        <MapContainer
          center={[mapPosition.lat, mapPosition.long]}
          zoom={5}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="Map"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg"
          />
          {airports &&
            airports.map((value) => (
              <Marker position={[value.lat, value.long]} icon={airportIcon}>
                <Popup>
                  <AddFlightModal airport={value} />
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
