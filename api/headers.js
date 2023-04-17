const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const format = (req.query.format || "html").toLowerCase();
  const headers = req.headers;
  const headersArray = Object.entries(headers);

  switch (format) {
    case "json":
      // Render JSON format
      res.type("json").send(JSON.stringify(headers, null, 2));
      break;
    case "xml":
      // Render XML format
      var xml = headersArray
        .map(([key, value]) => `<li>${key}: ${value}</li>`)
        .join("");
      res.type("xml").send(`<ul>${xml}</ul>`);
      break;

    case "html":
      // Render HTML format
      var html = headersArray
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
