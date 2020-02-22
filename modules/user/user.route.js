const router = require('express').Router()
const UserController = require('./user.controller')

const authenticate = require('./../../middlewares/authenticate')

router.route('/search') 
    .post(UserController.search)

//put this part at last
router.route('/:id')
    .get(UserController.findById)
    .put(UserController.update)
    .delete(UserController.remove) 
    
module.exports = router