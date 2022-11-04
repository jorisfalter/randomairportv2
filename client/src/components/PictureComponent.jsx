import React from "react";

// function sayHello() {
//   alert("You clicked me!");
// }

function PicComponent() {
  const [data, setData] = React.useState(null);

  const whenClicked = React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  // const fetchRequest = React.useCallback(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
      {/* <p>{!data ? "Loading..." : data}</p> */}
      <button onClick={whenClicked}>Next</button>
      <img alt="airport" src={!data ? "Loading..." : data} />
    </div>
  );
}

export default PicComponent;
