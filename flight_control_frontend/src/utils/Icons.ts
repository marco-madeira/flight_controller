import L from "leaflet";

export const airplaneIcon = new L.Icon({
    iconUrl: 'airplane.svg', 
    iconSize: [42, 42], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32],
  });

 export const airportIcon = new L.Icon({
    iconUrl: 'airport.svg', 
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32],
  });