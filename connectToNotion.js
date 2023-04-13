//jshint esversion:6
require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DB_ID;

async function queryDatabase(databaseId) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // this part seems to work

    let dbLength = response.results.length;
    console.log(dbLength);
  } catch (error) {
    console.log(error.body);
  }
  // Notion counts from the bottom!

  // response.results[randomNumber].properties.Link.rich_text[0].text
  //   .content, // Airportlink
  // response.results[randomNumber].properties.Name.title[0].text.content, // Airportname
  // response.results[randomNumber].properties.Latitude_NS.number, // Latitude_NS
  // response.results[randomNumber].properties.Longitude_EW.number, // Longitude_EW
  // console.log(response.results[randomNumber].properties.Sequence.number);
  // response.results[randomNumber].properties.ReadyForUse.checkbox == false
}

queryDatabase(databaseId);
