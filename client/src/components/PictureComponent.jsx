import React from "react";

function PicComponent() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
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
      <img alt="airport" src={!data ? "Loading..." : data} />
    </div>
  );
}

export default PicComponent;
