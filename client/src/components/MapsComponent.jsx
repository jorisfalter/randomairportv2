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

const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";

// update 10 januari. We krijgen een sync functie aan het werk. Volgende uitdaging (1) werkt hij async evenzeer? (2) kunnen we het dan vervangen door de originele getAddressCoords functie?
// update 20 januari. Ik heb de getAddressCoordsAsync in een aparte file (component) gestoken om te zien of hij werkt. Voorlopig krijg ik er nog niets uit. Als hij werkt kan ik hem hopelijk
// in deze file importeren, voor nu zit ie in App.jsx. Ik denk dat ik hem zal moeten herschrijven als een UseState functie. Ik wou kijken of ie werkt voordat ik hem op StackOverflow als vraag gooi.

function getAddressCoords() {
  console.log("abd");
  return "here's your address";
}
const addressCoords = getAddressCoords();

async function getAddressCoordsAsync() {
  //   const response = await fetch(
  //     "https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}",
  //     {}
  //   );
  //   const jsonData = await response.json();
  //   return { coords: jsonData.results[0].geometry.location };
  return "blablabla";
}

const addressCoordsAsync = getAddressCoordsAsync();
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
  <div>
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
      ik kan hier iets schrijven
      {/* {address} */}
      en hier ook
      {testString}
      {/* {addressCoords} */}
      {/* {addressCoordsAsync} */}
    </GoogleMap>
  </div>
));

export default MyMapComponent;
