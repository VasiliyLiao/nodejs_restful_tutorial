const fs = require('fs');
const join = require('path').join;
const routesGroupDir = join(__dirname, '../app/routes/autoload_groups');
const routerIndex = require('../app/routes/index');
const router = require('express').Router();


fs.readdirSync(routesGroupDir)
  .filter(function(file) {
    return ~file.search(/^[^\.].*\.js$/);
  })
  .forEach(function(file) {
    const fileName = file.split('.')[0];
    const filePath = join(routesGroupDir, file);
    router.use('/' + fileName, require(filePath));
    console.log('including routerGroup:' + fileName + '\t routerPath: ' + filePath);
  });

router.use('/', routerIndex);

module.exports = router;
