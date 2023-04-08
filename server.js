const express = require("express");
const { join } = require("path");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// Serve static assets from the /public folder
app.use("/assets", express.static(join(__dirname, "assets")));

app.get("/login", async (req, res) => {

  let password = req.query.password;

  if (password=='magisk') {
    res.status(200).send('logged in');
    return;
  } else {
    res.status(401).send('wrong code');
  }

});

app.get("/checkphrase", async (req, res) => {

  let phrase = req.query.phrase;

  if (phrase=='iskub') {
    res.status(200).send('correct');
    return;
  } else {
    res.status(401).send('wrong phrase');
  }

});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
