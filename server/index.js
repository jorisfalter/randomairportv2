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

    let dbLength = response.results.length;
    let randomNumber = Math.floor(Math.random() * dbLength);
    randomNumberArray.push(randomNumber);
    // console.log("db length: " + dbLength);
    // console.log("randomNumber: " + randomNumber);
    // console.log("array: " + randomNumberArray);

    let airportLink =
      response.results[randomNumber].properties.Link.rich_text[0].text.content;
    // console.log("linkToPic: " + response);

    // console.log(typeof airportLink === undefined);
    // hij gaat niet in de if else als hij undefined is

    // if (typeof airportLink === "undefined") {
    //   // this doesn't work yet
    //   console.log("not defined");
    //   //   queryDatabase(databaseId);
    // } else {
    // console.log("in the else");
    return response.results[randomNumber].properties.Link.rich_text[0].text
      .content; // Airportlink
    // return (response.results[randomNumber].properties.Name.title[0].text.content) // Airportname
    // }
  } catch (error) {
    console.log(error.body);
  }
}

app.get("/api", function (req, res) {
  queryDatabase(databaseId).then((result) => {
    // console.log("result: " + result);
    res.json({ message: result });
  });
  // sending a static html for now
  //   res.sendFile(__dirname + "/index.html");
});

app.get("/testapi", function (req, res) {
  console.log("req made");
  res.json({ key: "value" });
});

app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
