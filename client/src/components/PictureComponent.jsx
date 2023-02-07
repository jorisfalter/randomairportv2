import React from "react";

function PicComponent() {
  const [airportPicLink, setAirportPicLink] = React.useState(null);
  // const [airportName, setAirportName] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((airportPicLink) => setAirportPicLink(airportPicLink.message));
    // .then((airportName) => setAirportName(airportName.message2airportName));
  }, []);

  function WhenClicked() {
    fetch("/api")
      .then((res) => res.json())
      .then((airportPicLink) => setAirportPicLink(airportPicLink.message));
  }

  return (
    <div>
      <button className="button" onClick={WhenClicked}>
        Next
      </button>
      {airportPicLink}
      {/* {airportName} */}
      <img
        alt="airport"
        src={!airportPicLink ? "Loading..." : airportPicLink}
      />
    </div>
  );
}

export default PicComponent;
