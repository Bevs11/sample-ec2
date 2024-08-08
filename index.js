// const cron = require("node-cron");

// cron.schedule("* * * * *", () => {
//   console.log("Hello, World!");
// });

const axios = require("axios");

// Make a GET request to a public API
axios
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => {
    console.log("DATA FROM API:", response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

console.log("Hello, World!" + new Date());
