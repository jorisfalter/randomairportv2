//jshint esversion:6
const fetch = require("cross-fetch");

require("dotenv").config();

/// THERE IS SOME ISSUE WITH FETCH > It doens't work with require, or with import, ...

// async function getCoords() {
const mapsKey = process.env.MAPS_GEOCODER_API_KEY;
// const address = props.airportName.substring(0, 4) + " airport";
const address = "eham airport";
const URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  address +
  "&key=" +
  mapsKey;

async function fetchData() {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    console.log(
      "xcor: " +
        json.results[0].geometry.location.lat +
        "ycor: " +
        json.results[0].geometry.location.lng
    );

    // setLocation(json.results[0].address_components[0].long_name); for debugging only
  } catch (error) {
    console.log("error", error);
  }
}
fetchData();
// }

// getCoords();
