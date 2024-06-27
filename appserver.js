const express = require("express");
PORT = 3002;

const app = express();

app.get("/", async (req, resp) => {
  resp.send("Welcome");
});

app.listen(PORT, () => {
  console.log("Server Listening at " + PORT);
});
