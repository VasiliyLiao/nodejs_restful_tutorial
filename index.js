const app = require('express')();
const bodyParser = require('body-parser');
const databaseBootstrap = new (require('./bootstrap/db'));
const routeBootstrap = require('./bootstrap/routes');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/', routeBootstrap);

app.listen(port, function() {
  console.log('the app server has listen on port ' + port);
});
