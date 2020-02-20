var express = require('express')
const port = 8090

var app = express()
//this app is entire express framework

//database
require('./database/db')

//load middleware
const authenticate = require('./middlewares/authenticate')

//third party middleware
const morgan = require('morgan')
app.use(morgan('dev'))

// //user body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json()) 

//inbuilt middleware (for images, videos and other files)
//app.use(express.static('files')) //serve locally within express
//app.use('files', express.static('files')) //serve for external request

//load routing level middleware
const authRoute = require('./controllers/auth.route')
const userRoute = require('./controllers/user.route')

console.log('test printing')

app.use('/auth', authRoute)
app.use('/user', authenticate, userRoute)

//configuration block
app.use((request, response, next) => { 
    next({ 
        msg : "Not Found",
        status : 404
    })
})

//error handling middleware
app.use((err, req, res, next)=>{
    console.log('I am error handling middleware')
    res.json({
        msg : err.msg || err,
        status : err.status || 400
    })
    console.log('err >> ', err)
})

app.listen(port, (err, success) => {
    if(err) {
        console.log('server listening failed')
    } else {
        console.log('success listening at port >> ' + port, success)
    }
}) 
