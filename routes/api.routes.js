const router = require('express').Router()

//authentication
const authenticate = require('./../middlewares/authenticate') 
const authorize = require('./../middlewares/authorize')

//load routing level middleware 
const authRoute = require('./../modules/auth/auth.route')
const userRoute = require('./../modules/user/user.route')
const industryCategoryRoute = require('./../modules/template/industry.category/industryCategory.route')

router.use('/auth', authRoute)
router.use('/user', authenticate, userRoute) 
router.use('/template/industryCategory', industryCategoryRoute)

module.exports = router 