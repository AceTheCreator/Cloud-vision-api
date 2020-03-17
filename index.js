const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();

// init app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger(':method :host :status :res[content-length] - :response-time ms'));
logger.token('host', (req) => req.hostname);

// router controllers
const routes = require('./controllers/routes');

app.use('/vision/api', routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log('app now listening to port');
});
