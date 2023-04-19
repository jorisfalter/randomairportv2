import React from "react";
import NewPicComponent from "./NewPictureComponent.jsx";

function App() {
  const [newAirportPicLinkAndName, setNewAirportPicLinkAndName] =
    React.useState({
      message: "no link yet",
      message2airportName: "no name yet",
      message3latitude_ns: "no coords yet",
      message4latitude_ew: "no coords yet",
      message5randomnumber: "no random number yet",
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
          <span className="feedback-form1">
            <i class="fa fa-comments"></i>
            {"  "}
            <a
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/1IdwkRChkpVNy_rbbB-GoS4vG-jcp4kwlzouzk0viX_w/edit?usp=sharing"
            >
              Feedback Suggestions Requests
            </a>
          </span>
        </div>
      </header>
    </div>
  );
}

export default App;
