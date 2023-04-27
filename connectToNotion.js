//jshint esversion:6
require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseIdProd = process.env.NOTION_DB_ID; // Production
const databaseIdTest = process.env.NOTION_DB_ID_TEST; // Test

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

  // Loop through each row and update the properties if the checkbox is false
  for (const row of response.results) {
    if (!row.properties.ReadyForUse.checkbox) {
      // Update the checkbox property to true and add "changed" to the text_test column
      await notion.pages.update({
        page_id: row.id,
        properties: {
          ReadyForUse: {
            checkbox: true,
          },
          Text_test: {
            rich_text: [
              {
                text: {
                  content: "changed",
                },
              },
            ],
          },
        },
      });
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
