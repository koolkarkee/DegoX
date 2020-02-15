var express = require('express')
var router = express.Router()

const UserModel = require('./../models/user.model')
    
router.post('/login',  (req, res, next) => {
    
})

router.get('/register', (req, res, next) => {
    res.status(200).json({ msg : "OK"})
})

//login module
router.post('/register',  (req, res, next) => {
    const data = req.body
    console.log("request body", data)

    const user = new UserModel({})

    user.name = data.name
    user.username = data.username
    user.password = data.password
    user.email = data.email
    user.phone = data.phone
    user.address = {
        temporary_address : data.temporary_address,
        permanent_address : data.permanent_address
    }
    user.dob = data.dob
    user.avatar = data.avatar
    user.gender = data.gender
    user.role = data.role
    user.status = data.status

    console.log('user >> ', user)

    user
        .save()
        .then(success => {
            res.status(200).json(success)
        })
        .catch(err => {
            next(err)
        })
        .finally()
})
     

module.exports = router