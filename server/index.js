//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@notionhq/client");
const path = require("path");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_ID;

const app = express();

const PORT = process.env.PORT || 3001;

let randomNumberArray = [];
// let randomNumber = 0; // declaring it here to avoid an error

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

async function queryDatabase(databaseId) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // this part seems to work

    let dbLength = response.results.length;
    // let dbLength = 3; // deze terug veranderen

    // notion also adds empty rows, so if the length of the airportname is less than 4 characters, we reduce dbLength with 1
    // Notion counts from the bottom, so we have to remove the bottom rows

    let randomNumber = Math.floor(Math.random() * dbLength);
    randomNumberArray.push(randomNumber);
    console.log("this is the random number " + randomNumber);

    // this function fetches a new number after a faulty row has been discovered
    // for unclear reasons I cannot call it straight away when the app launches, so the lines above are duplicates necessary for first run
    function getRandomNumberFromDb() {
      randomNumber = Math.floor(Math.random() * dbLength);
      randomNumberArray.push(randomNumber);
    }

    while (
      typeof response.results[randomNumber].properties.Link.rich_text[0] ==
      "undefined"
    ) {
      getRandomNumberFromDb();
    }

    console.log(response.results[randomNumber].properties.Latitude_NS.number);
    console.log(response.results[randomNumber].properties.Longitude_EW.number);
    // console.log(response.results[randomNumber].properties.number);

    return [
      response.results[randomNumber].properties.Link.rich_text[0].text.content, // Airportlink
      response.results[randomNumber].properties.Name.title[0].text.content, // Airportname
      response.results[randomNumber].properties.Latitude_NS.number, // Latitude_NS
      response.results[randomNumber].properties.Longitude_EW.number, // Longitude_EW
    ];
  } catch (error) {
    console.log(error.body);
  }
}

app.get("/api", function (req, res) {
  queryDatabase(databaseId).then((result) => {
    console.log("wat we ontvangen na queryDatabase functie: " + result);
    res.json({
      message: result[0],
      message2airportName: result[1],
      message3latitude_ns: result[2],
      message4longitude_ew: result[3],
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// ik denk dat ik dit mag deleten
app.get("/testapi", function (req, res) {
  console.log("req made");
  res.json({ key: "value" });
});

// dit niet uiteraard
app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
