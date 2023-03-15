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
    <div className="app-toplevel">
      <header className="app-header">
        {/* <div className="test">abc</div> */}
        <div ClassName="app-lowerlevel">
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
