var express = require('express')
var router = express.Router()

const UserModel = require('./../models/user.model')
const MapUserReq = require('./../mappers/mapuser')
    
var passwordHash = require('password-hash')
const JWT = require('jsonwebtoken')

const config = require('./../configs')
function createToken(data){
    var token = JWT.sign(data, config.JWT_secret)
    return token
}

router.get('/', (req, res, next) => {
    res.status(200).json({ msg : "Ok"})
})

router.get('/register', (req, res, next) => {
    res.status(200).json({ msg : "OK register"})
})

router.post('/register',  (req, res, next) => { 
    console.log("request body", req.body)

    const user = new UserModel({})
    MapUserReq(user, req.body)
    user.password =  passwordHash.generate(user.password)

    console.log("to be inserted ", user)

    user
        .save()
        .then(success => {
            console.log('user registered sucessfully')
            res.status(200).json(success)
        })
        .catch(err => {
            console.log('err : register >> ', err)
            next(err)
        })
        .finally()
})
     

router.post('/login',  (req, res, next) => {
    UserModel.findOne({
        username : req.body.username
    }, (err, user) => {
        if(err){
            next(err)
        }
        if(user == null){
            return next({
                msg : "Invalid user/password"
            })
        }
        var isMatch = passwordHash.verify(req.body.password, user.password)
        if(!isMatch){
            return next({
                msg : "Invalid user/password"
            })
        } else { //password is matched
            var token = createToken({
                name : user.username,
                _id : user.id,
                role : user.role
            })
             res.status(200).json({
                user,
                token
             })
        }
    })
})


module.exports = router