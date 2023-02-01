// this is only a test component to see if the fetch returns the expected data
import React, { useState, useEffect } from "react";

// de async functie werkt niet

// const handleFetchData = async () => {
//   const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
//   const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
//   const response = await fetch(
//     "https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapsKey}",
//     {}
//   );
//   const jsonData = await response.json();
//   console.log(jsonData);
//   const coords = jsonData.results[0].geometry.location;
//   return coords;
// };

// this function to test if it works
// function GetAddressCoordsAsync() {
//   const coords = "well this works!";
//   return coords;
//   // return <div>{coords}</div>;
// }

// het werkt met de advice slip
// dus het is mijn google api die niet werkt
// de google api geeft nu resultaat in de browser
// maar om de een of adnere reden komt ie niet door in de app
const Example = () => {
  const [location, setLocation] = useState(0);
  const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
  const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
  const foutURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    address +
    "&key=" +
    mapsKey;

  useEffect(() => {
    // const URL = "https://api.adviceslip.com/advice";
    const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
    const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
    const URL =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=" +
      mapsKey;

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const json = await response.json();
        console.log(json);
        // setLocation(json.slip.advice);
        // setLocation(json.results.geometry.location.lat);
        setLocation(json.results.address_components.long_name);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      dit is de locatie
      {location}
      <br></br>
      en dit is de URL {foutURL}
    </div>
  );
};

export default Example;
