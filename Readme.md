# README

# Basic Node JS Playgournd

* Mysql is required to run on localhost:3306
* SQL Connection details can be tweaked in db/connection.js

- In order to run migrations run:

```bash
npm run migrate
```

- In order to run server run:

```bash
npm start
```

- Visit /update in order to update DB vith conversion rates
- Visit /convert?fromCur=CUR&toCur=CUR&value=19 where CUR use a currency (e.g. USD, EUR, GBP etc) in order to convert the passed value
