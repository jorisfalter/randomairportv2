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

// const coordsLat = -34.397;
// const coordsLon = 150.644;
// kan ik deze coordinaten krijgen uit getAddressCoords
// maar we gaan dat in app.js doen

// const [airportCoords, setAirportCoords] = React.useState({
//   xcor: "",
//   ycor: "",
// });
// let xcor = 10;
// let ycor = 10;

// we zijn aan het proberen deze constante te definieren voordat hij de component rendert
// voorlopig voert hij dit echter niet uit
// alternatief is om een google maps embed te gebruiken die niet compose gebruikt
// of om de coords toch een niveau hoger te krijgen

const MyMapComponent = compose(
  withProps({
    googleMapURL: gMapsUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  //   coordsNew
)((props) => (
  <div>
    <p>dit is de luchthaven in MapsComponent: {props.airportName}</p>
    <p>dit is de xcoor in MapsComponent: {props.airportXcoord}</p>
    <p>dit is de ycoor in MapsComponent: {props.airportYcoord}</p>
    {/* ycor: {xcor ? xcor : "loading"} */}
    {/* <br></br> */}
    {/* xcor: {xcor} */}
    <br></br>
    {/* coordsNew: {xcor ? xcor : "loading"} */}
    {/* xcor: {coordsNew} */}
    {/* ycor: {coordsNew[1]} */}
    <GoogleMap
      defaultZoom={9}
      //   defaultCenter={{ lat: props.airportXcoord, lng: props.airportYcoord }}
      defaultCenter={{ lat: props.airportXcoord, lng: props.airportYcoord }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.airportXcoord, lng: props.airportYcoord }}
        />
      )}
    </GoogleMap>
  </div>
));
// }

export default MyMapComponent;
// export default coordsNew;
