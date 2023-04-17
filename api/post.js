const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  if (req.method !== "POST") {
    return res.status(401).send(`Method ${req.method} not allowed`);
  }
  next();
});
router.post("/", (req, res) => {
  const format = (req.query.format || "html").toLowerCase();
  const body = req.body;
  const bodyArray = Object.entries(body);
  switch (format) {
    case "json":
      // Render JSON format
      {
        res.type("json").send(JSON.stringify(bodyArray, null, 2));
        console.log("json format requested");
      }
      break;
    case "xml":
      // Render XML format
      {
        const xml = bodyArray
          .map(([key, value]) => `<${key}>${value}</${key}>`)
          .join("");
        res.type("xml").send(`<ul>${xml}</ul>`);
        console.log("xml format requested");
      }
      break;

    case "html":
      // Render HTML format
      {
        const html = bodyArray
          .map(([key, value]) => `<li>${key}: ${value}</li>`)
          .join("");
        res.type("html").send(`<ul>${html}</ul>`);
        console.log("html format requested");
      }
      break;
    default:
      console.log("Format type not found.");
      res.sendStatus(404);
  }
});

module.exports = router;
