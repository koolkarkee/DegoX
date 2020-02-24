//morgan
const morgan = require('morgan')

//use body parser
var bodyParser = require('body-parser');

function load(app){
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended : false }));
    app.use(bodyParser.json())  
}

module.exports = {
    load
}