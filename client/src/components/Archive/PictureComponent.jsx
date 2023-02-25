import React from "react";

function PicComponent() {
  const [airportPicLinkAndName, setAirportPicLinkAndName] =
    React.useState(null);

  function fetchApi() {
    fetch("/api")
      .then((res) => res.json())
      .then((fetchedData) => setAirportPicLinkAndName(fetchedData));
  }

  React.useEffect(() => {
    fetchApi();
  }, []);

  function WhenClicked() {
    fetchApi();
  }

  // hieronder exporteren we Link naar de foto en de Naam van de airport
  // we displayen de naam in de Div
  // Dit moeten we nu op een andere manier exporteren
  return (
    <div>
      <p>
        {!airportPicLinkAndName
          ? "loading..."
          : airportPicLinkAndName.message2airportName}
      </p>
      <button className="button" onClick={WhenClicked}>
        Next
      </button>
      <img
        alt="airport"
        src={
          !airportPicLinkAndName ? "loading..." : airportPicLinkAndName.message
        }
      />
    </div>
  );
}

export default PicComponent;
