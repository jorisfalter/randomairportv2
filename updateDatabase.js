//jshint esversion:6
require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseIdProd = process.env.NOTION_DB_ID; // Production
const databaseIdTest = process.env.NOTION_DB_ID_TEST; // Test

const fetch = require("cross-fetch");

require("dotenv").config();

const mapsKey = process.env.MAPS_GEOCODER_API_KEY;
let address = "";
let URL = "";
let xcor = "";
let ycor = "";

async function queryDatabase(databaseId) {
  let results = [];

  // Start the initial request
  let response = await notion.databases.query({
    database_id: databaseId,
  });

  results = response.results;

  // Keep looping through the results as long as there are more pages
  while (response.has_more) {
    response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: response.next_cursor,
    });

    results = [...results, ...response.results];
  }
  console.log(results.length);

  // Loop through each row and update the properties if the checkbox is false
  for (const row of response.results) {
    if (!row.properties.ReadyForUse.checkbox) {
      address =
        row.properties.Name.title[0].plain_text.substring(0, 4) + " airport";

      //   let latns = row.properties.Latitude_NS.number;
      //   console.log("lat_ns: " + latns);
      URL =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        mapsKey;

      try {
        // call the geocoder
        async function callGeocoder() {
          const response = await fetch(URL);
          const json = await response.json();
          let xcor_notRounded = json.results[0].geometry.location.lat;
          let ycor_notRounded = json.results[0].geometry.location.lng;
          xcor = parseFloat(xcor_notRounded.toFixed(4));
          ycor = parseFloat(ycor_notRounded.toFixed(4));
          //   console.log(
          // "xcor: " +
          //   json.results[0].geometry.location.lat +
          //   " ycor: " +
          //   json.results[0].geometry.location.lng
          //   );
        }
        await callGeocoder();

        // Change the content
        // I do the final check manually, I want to manually set to "OK"
        await notion.pages.update({
          page_id: row.id,
          properties: {
            //// changing the checkbox
            // ReadyForUse: {
            //   checkbox: true,
            // },

            //// changing the test field > only works in test
            // Text_test: {
            //   rich_text: [
            //     {
            //       text: {
            //         content: "xcor: " + xcor + ", ycor: " + ycor,
            //       },
            //     },
            //   ],
            // },

            //// change the latitutde and longitude colums
            Latitude_NS: { number: xcor },
            Longitude_EW: { number: ycor },
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  // Return the complete list of results
  return results;
}

// Call the function and log each row
//// Production
// queryDatabase(databaseIdProd).then((rows) => {
//// Test
queryDatabase(databaseIdTest).then((rows) => {
  // rows.forEach((row) => {
  //   // console.log(row.properties.Sequence.number);
  //   // console.log(row.properties.Text.rich_text);
  //   // console.log(row.properties.Text.rich_text[0].text.content);
  //   // console.log(row.properties.Text.rich_text[0].plain_text);
  //   // console.log(row.properties.ReadyForUse.checkbox);
  //   // do something with each row here
  // });
});
