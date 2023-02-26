import React from "react";
import NewPicComponent from "./NewPictureComponent.jsx";

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
          {/* <p>{newAirportPicLinkAndName.message2airportName}</p> */}

          <NewPicComponent
            onButtonClick={fetchApi} // wanneer ik hier haakjes achter zet stopt ie niet meer met de functie te callen !!
            newPicComponentTransfer={newAirportPicLinkAndName}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
