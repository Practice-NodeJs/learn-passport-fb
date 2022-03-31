var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

var app = express();

const accountModel = require("./model/account");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res, next) => {
  res.render("index");
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    accountModel
      .findOne({ username: username, password: password })
      .then((data) => {
        if (!data) done(null, false);
        done(null, data);
      })
      .catch((err) => {
        done(err);
      });
  })
);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, data) => {
    if (err) {
      return res.status(500).json("Lỗi server !");
    }
    if (!data) {
      return res.status(400).json("Sai tài khoản hoặc mật khẩu !");
    }

    jwt.sign(data.toObject(), "123456", (err, token) => {
      if (err) {
        return res.status(500).json("Lỗi server !");
      }
      return res.json(token);
    });
  });
});

module.exports = app;
