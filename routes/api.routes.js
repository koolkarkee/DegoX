const router = require('express').Router()

//authentication
const authenticate = require('./../middlewares/authenticate') 
const authorize = require('./../middlewares/authorize')

//load routing level middleware 
const authRoute = require('./../modules/auth/auth.route')
const userRoute = require('./../modules/user/user.route')

router.use('/auth', authRoute)
router.use('/user', userRoute) 

module.exports = router

