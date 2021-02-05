const schema = {
  create: `CREATE DATABASE IF NOT EXISTS currencies_db;`,
  createCurrencies: `CREATE TABLE IF NOT EXISTS \`currencies_db\`.\`currencies\` (id INT NOT NULL AUTO_INCREMENT, currency VARCHAR(10) NOT NULL, val FLOAT(40) NOT NULL, PRIMARY KEY ( id ));`,
  addIndexToCurrencies: `CREATE UNIQUE INDEX IF NOT EXISTS currency_name_index ON \`currencies_db\`.\`currencies\` (currency)`,
};

exports.schema = Object.values(schema);
