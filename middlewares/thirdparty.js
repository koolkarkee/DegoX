//morgan
const morgan = require('morgan')

//use body parser
var bodyParser = require('body-parser');

//cors
const cors = require('cors')

function load(app){
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended : false }));
    app.use(bodyParser.json())  
    app.use(cors())
}

module.exports = {
    load
}