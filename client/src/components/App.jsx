import React from "react";
import NewPicComponent from "./NewPictureComponent.jsx";
import MyMapComponent from "./MapsComponent.jsx";
import AddressComponent from "./GetAddressComponent.jsx";

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
            // airportName="abc"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
