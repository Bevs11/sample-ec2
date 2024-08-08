// const cron = require("node-cron");

// cron.schedule("* * * * *", () => {
//   console.log("Hello, World!");
// });

const axios = require("axios");

const randomNumber = Math.floor(Math.random() * 100) + 1;

axios
  .get(`https://jsonplaceholder.typicode.com/todos/${randomNumber}`)
  .then((response) => {
    console.log("DATA FROM API:", response.data.title);
    console.log("Date:" + new Date());
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
