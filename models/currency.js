const { dbConnectionPool } = require("../db/connection");

const getCurrency = (id) => {
  const q = "SELECT * FROM `currencies_db`.`currencies` WHERE currency=?";
  console.log(
    `SELECT * FROM \`currencies_db\`.\`currencies\` WHERE currency=${id}`
  );
  return dbConnectionPool.query(q, id);
};

const getCurrencies = (...params) => {
  // Check params if object. If not, throw error. If yes, use in order to retrieve data
  //
  // Something like get_currencies({name: 'manolis', last_name: 'tsilikidis' etc});
};

// Inserts new data, updates existing ones
const updateData = (args = {}) => {
  const q =
    "INSERT INTO `currencies_db`.`currencies` (currency, val) VALUES ? ON DUPLICATE KEY UPDATE currency=VALUES(currency), val=VALUES(val);";

  let values = null;
  if (Array.isArray(args)) {
    throw new Error(
      "Pass object of values like { KEY1: VALUE1, KEY2: VALUE2 }"
    );
  } else if (typeof args === "object") {
    values = Object.keys(args).map((key) => {
      return [key, args[key]];
    });
  } else {
    throw new Error("Pass array or object");
  }
  console.log("HERE 2: ", values);
  return dbConnectionPool.query(q, [values], function (err, result) {
    if (err) throw err;
    console.log(
      `INSERT INTO \`currencies_db\`.\`currencies\` (currency, val) VALUES ${values} ON DUPLICATE KEY UPDATE currency=VALUES(currency), val=VALUES(val);`
    );
    return result;
  });
};

const convert = (fromCur, toCur, value) => {
  const q = "SELECT * FROM `currencies_db`.`currencies` WHERE currency IN (?)";
  return new Promise((resolve, reject) => {
    dbConnectionPool.getConnection((err, conn) => {
      if (err) throw err;

      conn.query(q, [[fromCur, toCur]], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const fromCurRow = results.filter((row) => {
            return row.currency === fromCur;
          });
          const toCurRow = results.filter((row) => {
            return row.currency === toCur;
          });

          if (
            fromCurRow.length === toCurRow.length &&
            fromCurRow.length === 1
          ) {
            const conversionMult = fromCurRow[0].val / toCurRow[0].val;
            const convertedValue = value * conversionMult;
            console.log("CONVERTED: ", convertedValue);
            resolve(convertedValue);
          } else {
            reject({ error: "No dta found" });
          }
        }
      });
    });
  });
};

exports.updateData = updateData;
exports.getCurrencies = getCurrencies;
exports.getCurrency = getCurrency;
exports.convert = convert;
