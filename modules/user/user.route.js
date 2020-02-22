const router = require('express').Router()
const UserController = require('./user.controller')

const authenticate = require('./../../middlewares/authenticate')

router.route('/')
    .get(UserController.find)
    // .post(UserController.insert)
    // .put(UserController.update)
    // .delete(authenticate, UserController.remove)

router.route('/search')
    .get(UserController.search)
    .post(UserController.search)

//put this part at last
router.route('/:id')
    .get(UserController.findById)
    
module.exports = router