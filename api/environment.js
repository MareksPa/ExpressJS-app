const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const format = (req.query.format || "html").toLowerCase();
  const envVars = process.env;
  const envArray = Object.entries(envVars);

  switch (format) {
    case "json":
      // Render JSON format
      res.type("json").send(JSON.stringify(envVars, null, 2));
      break;
    case "xml":
      // Render XML format
      var xml = envArray
        .map(([key, value]) => `<${key}>${value}</${key}>`)
        .join("");
      res.type("xml").send(`<ul>${xml}</ul>`);
      break;

    case "html":
      // Render HTML format
      var html = envArray
        .map(([key, value]) => `<li>${key}: ${value}</li>`)
        .join("");
      res.type("html").send(`<ul>${html}</ul>`);
      break;
    default:
      console.log("Format type not found.");
      res.sendStatus(404);
  }
});

module.exports = router;
