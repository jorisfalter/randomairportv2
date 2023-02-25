import React, { useState, useEffect } from "react";

function Example(props) {
  // const Example = () => {
  const [location, setLocation] = useState(0);

  useEffect(() => {
    const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
    const address = "EHAM airport";
    const URL =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=" +
      mapsKey;

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const json = await response.json();
        setLocation(json.results[0].geometry.location.lat);
        // setLocation(json.results[0].address_components[0].long_name); for debugging only
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return location;
}

export default Example;
