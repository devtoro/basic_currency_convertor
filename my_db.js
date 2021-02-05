const mysql = require("mysql");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const { dbConnectionPool } = require("./db/connection");
const Currency = require("./models/currency");
const e = require("express");

dbConnectionPool.getConnection((err) => {
  if (err) throw err;
  console.log("CONNECTED TO Database");
});

const currenciesUrl =
  "https://openexchangerates.org/api/latest.json?app_id=e9b9340335f7401cb4611d6e976bc0ac";

app.get("/", (req, res, next) => {
  res.send(`Hello World`);
});

app.get("/update", (req, res, next) => {
  fetch(currenciesUrl)
    .then((response) => response.json())
    .then((data) => {
      Currency.updateData(data.rates);
      const body = `
        <H2>UPDATED VALUES</H2>
        <p>${JSON.stringify(data.rates)}</p>
      `;
      res.send(body);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/convert", async (req, res, net) => {
  const queryParams = req.query;
  const fromCur = queryParams.fromCur || "USD";
  const toCur = queryParams.toCur || "EUR";
  const value = queryParams.value || 1;

  Currency.convert(fromCur, toCur, value)
    .then((result) => {
      const responseObject = {
        fromCur: fromCur,
        toCur: toCur,
        value: value,
        result: result,
      };
      res.send(responseObject);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.use(function (req, res) {
  res.redirect("/");
});

app.listen(3001, () => {
  console.log("listening on 3001");
});
