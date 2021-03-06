const fs = require('fs');
const mongoose = require('mongoose');
const join = require('path').join;
const entitiesDir = join(__dirname, '../app/entities');
const DB_CONFIG = require('../config/database.json');

fs.readdirSync(entitiesDir)
  .filter(function(file) {
    return ~file.search(/^[^\.].*\.js$/);
  })
  .forEach(function(file) {
    const fileName = file.split('.')[0];
    const filePath = join(entitiesDir, file);
    require(filePath);
    console.log('including entity:' + fileName + '\t entityPath: ' + filePath);
  });
  const connect = function() {
    const dbConnectStr = DB_CONFIG.sql + '://' + DB_CONFIG.username + ':' + DB_CONFIG.password + '@' + DB_CONFIG.host + ':' + DB_CONFIG.port + '/' + DB_CONFIG.database;
    return mongoose.connect(dbConnectStr).connection;
  };

module.exports = function() {
  const db = connect();

  db.on('error', function(err) {
    console.log('the database not connect. error:' + err);
  });
  db.on('disconnected', connect);
  db.once('open', function() {
    console.log('the database has connect success.');
  });
};
