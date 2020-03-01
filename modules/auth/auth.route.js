var express = require('express')
var router = express.Router() 

const authenticate = require('./../../middlewares/authenticate') 
const authorize = require('./../../middlewares/authorize') 

var authController = require('./auth.controller')

router.route('/')
    .get(authenticate, authController.find) 

router.route('/register') 
    .post(authController.insertUser) 

router.route('/verify')
    .get(authController.verifyUser)

router.route('/login')  
    .post(authController.login)

router.route('/forgot-password')
    .post(authController.forgotPassword)  

module.exports = router