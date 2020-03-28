const router = require('express').Router()
const Controller = require('./industryCategory.controller')

router.route('/insert')
    .post(Controller.insert)

router.route('/getAll')
    .get(Controller.find)

router.route('/search') 
    .get(Controller.search) 

//put this part at last
router.route('/:id')
    .get(Controller.findById)
    .put(Controller.update)
    .delete(Controller.remove) 
    
module.exports = router 