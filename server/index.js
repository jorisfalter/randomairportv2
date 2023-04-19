//jshint esversion:6
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { Client } = require("@notionhq/client");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_ID;

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({ secret: "my-secret", resave: false, saveUninitialized: true })
);

async function queryDatabase(databaseId) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // this part seems to work

    let dbLength = response.results.length;

    // Notion counts from the bottom!

    let randomNumber = Math.floor(Math.random() * dbLength);
    // this doesn't seem to work in it's current form > combines all users' pics
    // randomNumberArray.push(randomNumber);
    console.log("this is the random number " + randomNumber);
    // console.log(randomNumberArray);

    // this function fetches a new number after a faulty row has been discovered
    // for unclear reasons I cannot call it straight away when the app launches, so the lines above are duplicates necessary for first run
    function getRandomNumberFromDb() {
      randomNumber = Math.floor(Math.random() * dbLength);
      // randomNumberArray.push(randomNumber);
      // console.log(randomNumberArray);
    }

    while (
      // I replaced the previous checker with the checkbox checker. The earlier checker checks if the Link is available
      response.results[randomNumber].properties.ReadyForUse.checkbox == false
      // typeof response.results[randomNumber].properties.Link.rich_text[0] ==
      // "undefined"
    ) {
      getRandomNumberFromDb();
    }

    // console.log(response.results[randomNumber].properties.Latitude_NS.number);
    // console.log(response.results[randomNumber].properties.Longitude_EW.number);
    // console.log(response.results[randomNumber].properties.number);
    // console.log(response.results[randomNumber].properties.Sequence.number);

    return [
      response.results[randomNumber].properties.Link.rich_text[0].text.content, // Airportlink
      response.results[randomNumber].properties.Name.title[0].text.content, // Airportname
      response.results[randomNumber].properties.Latitude_NS.number, // Latitude_NS
      response.results[randomNumber].properties.Longitude_EW.number, // Longitude_EW
      randomNumber,
    ];
  } catch (error) {
    console.log(error.body);
  }
}

// async function findpicnumber(databaseId) {
//   try {
//     const response = await notion.databases.query({
//       database_id: databaseId,
//     });

//     // enter link to airport here
//     var selectedAirport =
//       "https://cdn.jetphotos.com/full/6/70162_1611190055.jpg";

//     // nu moet ik van hier naar een nummer geraken
//     // dus eerst die link vinden, als die bestaat

//     // Notion counts from the bottom!

//     // console.log(response.results[randomNumber].properties.Latitude_NS.number);
//     // console.log(response.results[randomNumber].properties.Longitude_EW.number);
//     // console.log(response.results[randomNumber].properties.number);
//     // console.log(response.results[randomNumber].properties.Sequence.number);

//     return [
//       response.results[randomNumber].properties.Link.rich_text[0].text.content, // Airportlink
//       response.results[randomNumber].properties.Name.title[0].text.content, // Airportname
//       response.results[randomNumber].properties.Latitude_NS.number, // Latitude_NS
//       response.results[randomNumber].properties.Longitude_EW.number, // Longitude_EW
//     ];
//   } catch (error) {
//     console.log(error.body);
//   }
// }

app.get("/api", function (req, res) {
  let usedNumbers = req.session.usedNumbers || [];

  function queryDatabaseWrapper() {
    queryDatabase(databaseId).then((result) => {
      console.log("what we receive after queryDatabase function: " + result);
      // picarray.push(result[4]); // number 4 is the randomnumber
      // console.log("picarray: " + picarray);
      let receivedRandomNumber = result[4];
      console.log("receivedRandomNumber: " + receivedRandomNumber);
      if (usedNumbers.includes(receivedRandomNumber)) {
        console.log("duplicate");
        queryDatabaseWrapper();
      } else {
        console.log("not a duplicate");
        usedNumbers.push(receivedRandomNumber);
        req.session.usedNumbers = usedNumbers;
        console.log("usedNumbers: " + req.session.usedNumbers);

        res.json({
          message: result[0],
          message2airportName: result[1],
          message3latitude_ns: result[2],
          message4longitude_ew: result[3],
          message5randomnumber: result[4],
        });
      }
    });
  }
  queryDatabaseWrapper();

  // console.log("receivedRandomNumber: " + receivedRandomNumber);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// //a function for when you want a specific number of pic
// app.get("/getpic", function (req, res) {
//   console.log("requested pic");
//   res.json({ key: "test" });
// });

// ik denk dat ik dit mag deleten
app.get("/testapi", function (req, res) {
  console.log("req made");
  res.json({ key: "value" });
});

// dit niet uiteraard
app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
