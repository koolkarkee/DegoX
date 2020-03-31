const Router = require('express').Router()

//authentication
const Authenticate = require('./../middlewares/authenticate') 
const Authorize = require('./../middlewares/authorize')

//load routing level middleware 
const AuthRoute = require('./../modules/auth/auth.route')
const UserRoute = require('./../modules/user/user.route')
const IndustryCategoryRoute = require('./../modules/template/industry.category/industryCategory.route')
const LogoRoute = require('./../modules/template/logo.template/logo.route')

Router.use('/auth', AuthRoute)
Router.use('/user', Authenticate, UserRoute) 
Router.use('/template/industryCategory', IndustryCategoryRoute)
Router.use('/template/logo', LogoRoute)


module.exports = Router 