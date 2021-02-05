const { dbConnection } = require("./connection");
const { schema } = require("./schema");

const runMigration = () => {
  const length = schema.length;
  return new Promise((resolve, reject) => {
    dbConnection.connect(function (err) {
      if (err) {
        reject(err);
      }
      console.log("Connected to DB");

      schema.forEach((sql, index) => {
        dbConnection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("RUN: " + sql);
          if (index === length - 1) {
            resolve("done");
          }
        });
      });
    });
  });
};

runMigration()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    throw err;
  });
