var express = require('express')
var router = express.Router() 

var authController = require('./auth.controller')

router.route('/')
    .get(authController.find)

router.route('/register')
    .get(authController.find)
    .post(authController.insertUser) 

router.route('/login') 
    .get(authController.find)
    .post(authController.login)

module.exports = router