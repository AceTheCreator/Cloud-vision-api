const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

//init app
const app = express();
// middlewares
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(logger(':method :host :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
    res.send('hello')
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log('app now listening to port')
});