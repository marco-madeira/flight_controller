import { MapContainer, Marker, TileLayer} from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution="Arango Map"
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.jpg"
      />
      <Marker position={[50.504, -0.04]}></Marker>
    </MapContainer>
  );
}

export default App;
