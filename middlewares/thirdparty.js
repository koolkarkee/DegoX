//morgan
const morgan = require('morgan')

//use body parser
var bodyParser = require('body-parser');

var dev = morgan('dev')
var urlencoded = bodyParser.urlencoded({ extended : false })
var json = bodyParser.json()
 
// module.exports = {
//     thirdPartyMiddlewares : function(req, res, next){
//         var dev = morgan('dev')
//         var urlencoded = bodyParser.urlencoded({ extended : false })
//         var json = bodyParser.json()

//         next()
//     }
// } 


