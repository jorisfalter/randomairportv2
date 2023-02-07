import React from "react";

function PicComponent() {
  const [data, setData] = React.useState(null);
  const [airportName, setAirportName] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    // .then((airportName) => setAirportName(airportName.message2airportName));
  }, []);

  function WhenClicked() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }

  return (
    <div>
      <button className="button" onClick={WhenClicked}>
        Next
      </button>
      {data}
      {/* {airportName} */}
      <img alt="airport" src={!data ? "Loading..." : data} />
    </div>
  );
}

export default PicComponent;
