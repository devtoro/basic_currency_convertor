const mysql = require("mysql");

let dbConnection = {
  host: "localhost",
  user: "root",
  password: "manolis",
};

let myDB = mysql.createConnection(dbConnection);
let myDBPool = mysql.createPool({ ...dbConnection, connectionLimit: 5 });

exports.dbConnection = myDB;
exports.dbConnectionPool = myDBPool;
