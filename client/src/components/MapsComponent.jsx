import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
const gMapsUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  mapsKey +
  "&v=3.exp&libraries=geometry,drawing,places";

const coordsLat = -34.397;
const coordsLon = 150.644;
// kan ik deze coordinaten krijgen uit getAddressCoords
// maar we gaan dat in app.js doen

const MyMapComponent = compose(
  withProps({
    googleMapURL: gMapsUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <div>
    <p>dit is de luchthaven: {props.airportName}</p>

    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: coordsLat, lng: coordsLon }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: coordsLat, lng: coordsLon }} />
      )}
    </GoogleMap>
  </div>
));

export default MyMapComponent;
