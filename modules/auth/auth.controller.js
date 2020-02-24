const AuthQuery = require('./auth.query')
const passwordHash = require('password-hash')
const createToken = require('./auth.hasher')   
const emailHelper = require('./../user/user.emailhelper')

//find a user
function find(req, res, next){
    var condition = {}
    
    console.log('from auth controller >> ')
    AuthQuery
        .find(condition) 
        .then(data => {
            console.log('success from auth find >> ', data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('err from auth controller >> ', err)
            return next(err)
        })
}

//for register
function insertUser(req, res, next){
    //hash the password first
    req.body.password = passwordHash.generate(req.body.password) 

    AuthQuery
        .insertUser(req.body) 
        .then(user => {
            console.log('registered successfully >> ', user) 

            //send email verification link
            emailHelper.sendRegistrationLink(user.email, user.username, user.emailToken)

            res.status(200).json(user)
        })
        .catch(err => {
            console.log('error while registering user >> ', err)
            return next(err) 
        })            
}

//for login 
function login(req, res, next){ 
    AuthQuery
        .login(req.body)
        .then(user => {
            console.log('successfully logged in >> ', user)

            var token = createToken({ 
                name : user.username,
                role : user.role,
                _id : user._id
            })  

            //generate token and respond
            res.status(200).json({
                user : user,
                token : token
            }) 
        })
        .catch(err => {
            console.log('error while logging user >> ', err)
            return next(err)
        })   
}

module.exports = {
    find,
    insertUser,
    login
}