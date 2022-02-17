// require('rootpath')();
// const express = require('express');
// const app = express();
// //const cors = require('cors');
// const bodyParser = require('body-parser');
// const errorHandler = require('_middleware/error-handler');
// const config = require('config.json');
// const initializeConnection = require('./_helpers/db');
//
// const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:3000/'
// }));
//
// initializeConnection();
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());
//
// // api routes
// app.use('/api', require('./users/index'));
//
// // global error handler
// app.use(errorHandler);
//
// const port = config.production == true ? (config.port || 80) : 4000;
//
// // start server
// app.listen(port, () => console.log('Server listening on port ' + port));



require('rootpath')();
const express = require('express');
const app = express();
//const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const config = require('config.json');
const initializeConnection = require('./_helpers/db');

const cors = require('cors');

const corsConfig = {
  origin: ['localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

initializeConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// api routes
app.use('/api', require('./users/index'));

// global error handler
app.use(errorHandler);

app.use(cors(corsConfig));

const port = config.production == true ? (config.port || 80) : 4000;

// start server
app.listen(port, () => console.log('Server listening on port ' + port));