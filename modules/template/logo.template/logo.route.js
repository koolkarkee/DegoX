const Router = require('express').Router()
const Controller = require('./logo.controller')

Router.route('/insert')
    .post(Controller.insert)

Router.route('/getAll')
    .get(Controller.find)

Router.route('/search') 
    .get(Controller.search) 

//put this part at last
Router.route('/:id')
    .get(Controller.findById)
    .put(Controller.update)
    .delete(Controller.remove) 
    
module.exports = Router 