import React from "react";
import NewPicComponent from "./NewPictureComponent.jsx";
import MyMapComponent from "./MapsComponent.jsx";
import AddressComponent from "./GetAddressComponent.jsx";
import AddressCoords from "./GetAddressCoords.jsx";

function App() {
  const [newAirportPicLinkAndName, setNewAirportPicLinkAndName] =
    React.useState({
      message: "no link yet",
      message2airportName: "no name yet",
    });

  function fetchApi() {
    fetch("/api")
      .then((res) => res.json())
      .then((fetchedData) => setNewAirportPicLinkAndName(fetchedData));
    getCoords();
  }

  // ik heb al eerder data fetched > in randomairport over de luchthavens
  // in plaats van een div moet ik een variable exporten
  function getCoords() {
    // alert(newAirportPicLinkAndName.message2airportName);
    // let abc = AddressCoords;
    // alert(abc);
  }

  React.useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div ClassName="App">
          <AddressComponent />
          <NewPicComponent
            onButtonClick={fetchApi} // wanneer ik hier haakjes achter zet stopt ie niet meer met de functie te callen !!
            newPicComponentTransfer={newAirportPicLinkAndName}
          />
          <MyMapComponent
            isMarkerShown
            airportName={newAirportPicLinkAndName.message2airportName}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
