const router = require('express').Router()
const Controller = require('./user.controller')

const authenticate = require('./../../middlewares/authenticate')

router.route('/search') 
    .post(Controller.search)

//put this part at last
router.route('/:id')
    .get(Controller.findById)
    .put(Controller.update)
    .delete(Controller.remove) 
    
module.exports = router