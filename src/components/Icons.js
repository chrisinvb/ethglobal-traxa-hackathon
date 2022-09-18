import L from "leaflet";
import defaultMarker from "leaflet/dist/images/marker-icon.png";

const containerIcon = L.icon({
  iconUrl: defaultMarker,
  iconRetinaUrl: defaultMarker,
  iconAnchor: [5, 55],
  popupAnchor: [8, -44],
  iconSize: [25, 41],
});

export { containerIcon };
