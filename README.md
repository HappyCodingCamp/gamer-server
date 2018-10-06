# gamer-server

Install LTS version of Node.js

Run `npm install` to install the dependencies

Run `npm start` to start the application. The app uses nodemon for hot reload.

App also uses standard.js for code formatting, run `npm test` before each commit to
automatically format the code according to standard.js specs.

Run `npm run purgedb` to purge the existing sqlite DB to apply the changes made to
dao sequelize models
