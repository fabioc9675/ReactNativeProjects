var Sequelize = require("sequelize"); //import sequelize
var database = require("./database"); // importing connection database

var User = database.define("USERs", {
  USER_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  USER_NAME: Sequelize.STRING,
  USER_PASS: Sequelize.STRING,
  USER_TOKEN: Sequelize.STRING,
  USER_MAIL: Sequelize.STRING,
});

module.exports = User;
