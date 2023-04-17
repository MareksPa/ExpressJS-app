//dependencies
require("dotenv").config();
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const convert = require("xml-js");
const express = require("express");
//routers
const indexRouter = require("./routes/index");
const environmentRouter = require("./routes/environment");
const headersRouter = require("./routes/headers");
const postRouter = require("./routes/post");
//environment colors
const bgColor = process.env.bgColor;
const fgColor = process.env.fgColor;
//make app
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/routes/environment", environmentRouter);
app.use("/routes/headers", headersRouter);
app.use("/routes/post", postRouter);

app.get("/", function (req, res) {
  res.render("index", {
    backgroundColor: process.env.bgColor,
    color: process.env.fgColor,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

const server = app.listen(3000, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});
