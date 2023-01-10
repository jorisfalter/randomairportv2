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
//      dat react variablen anders gebruikt, waardoor ik deze niet kan console.loggen
const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
// var addressCoords;

// de clue zit in de compose. Als we alles in de MyMapComponent functie kunnen steken zou het moeten lukken

// const [addressCoords, setAddressCoords] = useState(0);

// ik kan niet checken of de fetch functie werkt, want hij returned geen coordinaten
// ik denk niet dat de formule met gelijk aan tekens, dubbele haakjes, pijl, fetch correct is

// const addressCoords = () =>
//   fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}`
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((jsonData) => {
//       // addressCoords =
//       // console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
//       return jsonData.results[0].geometry.location; // {lat: 45.425152, lng: -75.6998028}
//       // setAddressCoords(jsonData.results[0].geometry.location);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

// de teststring komt wel door, maar de addressCoords niet. Dus er is iets mis met addressCoords.

// const addressCoords = (address, mapsKey) =>
//   async function getAddressCoords() {
//     const response = await fetch(
//       "https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}",
//       {}
//     );
//     const jsonData = await response.json();
//     //   console.log(jsonData.results[0].geometry.location);
//     //   return { coords: response };
//     return { coords: jsonData.results[0].geometry.location };
//     // return <div>jsonData.results[0].geometry.location </div>;
//   };

// async function getAddressCoords(inputAddress, inputMapsKey) {
//   const response = await fetch(
//     "https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${inputMapsKey}",
//     {}
//   );
//   const jsonData = await response.json();
//   return jsonData.results[0].geometry.location;
// }

// update 10 januari. We krijgen een sync functie aan het werk. Volgende uitdaging (1) werkt hij async evenzeer? (2) kunnen we het dan vervangen door de originele getAddressCoords functie?

function getAddressCoords() {
  return "here's your address";
}

const addressCoords = getAddressCoords();
const testString = "this is a test";

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
  //   const addressCoords = getAddressCoords();
  <div>
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
      ik kan hier iets schrijven
      {address}
      en hier ook
      {testString}
      {addressCoords}
    </GoogleMap>
  </div>
));

export default MyMapComponent;
