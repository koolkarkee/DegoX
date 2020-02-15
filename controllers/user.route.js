var router = require('express').Router()

router.route('/')
.get((req, res, next) => {
    res.send('from user')
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})
.put((req, res, next) => {
    
})


router.route('/change-password')
.get((req, res, next) => {
    res.send('from user change password')
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})
.put((req, res, next) => {
    
})

router.route('/profile')
.get((req, res, next) => {
    res.send('from user profile')
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})
.put((req, res, next) => {
    
})

module.exports = router