//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_ID;

const app = express();

const PORT = process.env.PORT || 3001;

let randomNumberArray = [];
// let randomNumber = 0; // declaring it here to avoid an error

app.use(express.static("public"));
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

    console.log(
      "here is the response: " +
        response.results[0].properties.Link.rich_text[0]
    );

    // this part seems to work
    if (
      typeof response.results[0].properties.Link.rich_text[0] == "undefined"
    ) {
      console.log("here is an undefined");
    }

    let dbLength = response.results.length;

    // notion also adds empty rows, so if the length of the airportname is less than 4 characters, we reduce dbLength with 1
    // Notion counts from the bottom, so we have to remove the bottom rows

    // function getRandomNumberFromDb() {
    let randomNumber = Math.floor(Math.random() * dbLength);
    randomNumber = 10; // for testing
    console.log("randomnumber " + randomNumber);
    randomNumberArray.push(randomNumber);
    // }
    // getRandomNumberFromDb();

    return [
      response.results[randomNumber].properties.Link.rich_text[0].text.content, // Airportlink
      response.results[randomNumber].properties.Name.title[0].text.content, // Airportname
    ];
  } catch (error) {
    console.log(error.body);
  }
}

app.get("/api", function (req, res) {
  queryDatabase(databaseId).then((result) => {
    console.log("here is the result: " + result);
    res.json({ message: result[0], message2airportName: result[1] });
  });
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
