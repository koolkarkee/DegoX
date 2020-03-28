var express = require('express')
var router = express.Router() 

const authenticate = require('./../../middlewares/authenticate') 
const authorize = require('./../../middlewares/authorize') 

var Controller = require('./auth.controller')

router.route('/')
    .get(authenticate, Controller.find) 

router.route('/register') 
    .post(Controller.insertUser) 

router.route('/verify')
    .get(Controller.verifyUser)

router.route('/login')  
    .post(Controller.login)

router.route('/forgot-password')
    .post(Controller.forgotPassword)  

router.route('/reset-password')
    .post(Controller.resetPassword)

module.exports = router