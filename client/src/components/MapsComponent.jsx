import React, { useState } from "react";
import ReactDOM from "react-dom";
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

// hier proberen we een adres te vertalen in coordinaten
// die we dan in de volgende stap gebruiken om de map te genereren
// nu is het probleem
//      dat ik niet weet of mapskey werkt
//      dat react variablene anders gebruikt, waardoor ik deze niet kan console.logen
const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
// var addressCoords;

// de clue zit in de compose. Als we alles in de MyMapComponent functie kunnen steken zou het moeten lukken

const [addressCoords, setAddressCoords] = useState(0);

fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}`
)
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    // addressCoords = jsonData.results[0].geometry.location; // {lat: 45.425152, lng: -75.6998028}
    setAddressCoords(jsonData.results[0].geometry.location);
  })
  .catch((error) => {
    console.log(error);
  });

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
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
      ik kan hier iets schrijven
      {address}
    </GoogleMap>
    {/* <Console log={address} /> */}
  </div>
));

export default MyMapComponent;
