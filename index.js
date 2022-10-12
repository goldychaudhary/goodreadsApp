// Get books API

const express = require("express");
const path = require("path"); //we will need path for filepath used in open method
const { open } = require("sqlite"); //open method is imported from sqlite module by object d-structuring
const sqlite3 = require("sqlite3"); //importing sqlite3 to provide the driver in open method
const app = express(); //express instance

const dbPath = path.join(__dirname, "goodreads.db"); //stores the path of db
let db = null; //holds the db connection object obtained from open method
//initializing server and db by this func
const initializeDBandServer = async () => {
  //open method will return a promise object bcs its time taking and will be stored in db
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database, //because we are using sqlite3 DB
    });
    app.listen(3000, () => {
      //server wil start on port http//localhost/3000
      console.log("Server started");
    });
  } catch (e) {
    console.log(`B Error: ${e.message}`);
    process.exit(1); //if any error occurs db will stop
  }
};
initializeDBandServer();

//writing the API GET BOOKS
app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT *
    FROM book
    ORDER BY book_id
    `;
  const bookArray = await db.all(getBooksQuery); //get the array of books from db
  response.send(bookArray); //sending response to client
});
