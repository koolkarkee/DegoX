var express = require('express')
var router = express.Router() 

const authenticate = require('./../../middlewares/authenticate') 
const authorize = require('./../../middlewares/authorize') 

var authController = require('./auth.controller')

router.route('/')
    .get(authenticate, authController.find) 

router.route('/register') 
    .post(authController.insertUser) 

router.route('/login')  
    .post(authController.login)

module.exports = router