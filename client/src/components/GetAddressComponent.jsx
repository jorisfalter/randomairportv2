// this is only a test component to see if the fetch returns the expected data
import React from "react";

// async function GetAddressCoordsAsync() {
//   const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
//   const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";

//   const response = await fetch(
//     "https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}",
//     {}
//   );
//   const jsonData = await response.json();
//   const coords = jsonData.results[0].geometry.location;
//   return <div>coords</div>;
// }

// this function to test if it works
function GetAddressCoordsAsync() {
  const coords = "well this works!";
  return <div>{coords}</div>;
}

export default GetAddressCoordsAsync;
