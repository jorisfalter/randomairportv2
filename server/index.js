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

    let airportLink =
      response.results[randomNumber].properties.Link.rich_text[0].text.content;

    return [
      response.results[randomNumber].properties.Link.rich_text[0].text.content, // Airportlink

      response.results[randomNumber].properties.Name.title[0].text.content,
    ]; // Airportname
  } catch (error) {
    console.log(error.body);
  }
}

app.get("/api", function (req, res) {
  queryDatabase(databaseId).then((result) => {
    console.log(result);
    res.json({ message: result[0], message2airportName: result[1] });
  });
});

// ik denk dat ik dit mag deleten
app.get("/testapi", function (req, res) {
  console.log("req made");
  res.json({ key: "value" });
});

app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
