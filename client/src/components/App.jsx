import React from "react";
import NewPicComponent from "./NewPictureComponent.jsx";
import MyMapComponent from "./MapsComponent.jsx";
import AddressComponent from "./GetAddressComponent.jsx";
// import AddressCoords from "./GetAddressCoords.jsx";

function App() {
  const [newAirportPicLinkAndName, setNewAirportPicLinkAndName] =
    React.useState({
      message: "no link yet",
      message2airportName: "no name yet",
    });

  const [airportCoords, setAirportCoords] = React.useState({
    xcor: "",
    ycor: "",
  });

  function fetchApi() {
    fetch("/api")
      .then((res) => res.json())
      .then((fetchedData) => setNewAirportPicLinkAndName(fetchedData));
    // hier roep ik getCoords al
    getCoords();
  }

  // ik heb al eerder data fetched > in randomairport over de luchthavens
  // in plaats van een div moet ik een variable exporten
  function getCoords() {
    // alert(newAirportPicLinkAndName.message2airportName);
    // let abc = AddressCoords;
    // alert(abc);
    const mapsKey = process.env.REACT_APP_MAPS_API_KEY;
    // const address = "EHAM airport";
    const address =
      newAirportPicLinkAndName.message2airportName.substring(0, 4) + " airport";
    alert(address);
    const URL =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=" +
      mapsKey;
    async function fetchData() {
      try {
        const response = await fetch(URL);
        const json = await response.json();
        setAirportCoords({
          xcor: json.results[0].geometry.location.lat,
          ycor: json.results[0].geometry.location.lng,
        });

        // setLocation(json.results[0].address_components[0].long_name); for debugging only
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }

  React.useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div ClassName="App">
          {airportCoords.xcor}
          <br></br>
          {airportCoords.ycor}
          <AddressComponent />
          <NewPicComponent
            onButtonClick={fetchApi} // wanneer ik hier haakjes achter zet stopt ie niet meer met de functie te callen !!
            newPicComponentTransfer={newAirportPicLinkAndName}
          />
          <MyMapComponent
            isMarkerShown
            airportName={newAirportPicLinkAndName.message2airportName}
            airportXcoord={airportCoords.xcor}
            airportYcoord={airportCoords.ycor}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
