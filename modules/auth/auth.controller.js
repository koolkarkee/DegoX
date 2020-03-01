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
            console.log('registered user id >> ', user._id)

            //send email verification link
            emailHelper.sendRegistrationLink(user.email, user._id, user.emailToken)

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

//for user verification
function verifyUser(req, res, next){
    //retrieve the email token
    //verify it
    //if verified, set the variables and return result 
    var emailToken = req.query.emailToken
    console.log('email token retrieved >> ', emailToken)

    var id = req.query.id
    console.log('user id >> ', id)

    //check for null tokens
    if(emailToken == null || emailToken == '' || id == null || id == ''){ 
        return next({
            msg : 'invalid request',
            status : 404
        })
    }

    //proceed towards verification
    AuthQuery
        .verifyUser(emailToken) 
        .then(user => { 
            user = user[0]            
            console.log('to be verified user >> ', user)
            if(!user){
                return next({
                    msg : 'invalid emailConfirmation token',
                    status : 404
                })
            }

            console.log('is user email confirmed >> ', user.emailConfirmed)
            if(user.emailConfirmed == true){ 
                return next({
                    msg : 'user email is already confirmed, invalid request',
                    status : 404
                })
            }

            //start the verification by verifying emailTokenExpiryDate  
            var currentDate = new Date()
            tokenExpiryDate = (Date)(user.tokenExpiryDate)
            //var tokenExpiryDate = new Date(1988, 1, 1, 2, 2, 2, 2) //fake value for testing

            console.log('current date >> ', currentDate) 
            console.log('token expiry date >> ', tokenExpiryDate)

            if(currentDate > tokenExpiryDate){
                return next({
                    msg : 'email token has already expired',
                    status : 404
                })
            }

            //update the user by nullyfying token and expiry date
            user.emailToken = ' '
            user.emailTokenExpiryDate = new Date(1970, 1, 1, 2, 2, 2, 2) //set the date way back
            user.emailConfirmed = true  
            console.log('user.emailTokenExpiryDate >> ', user.emailTokenExpiryDate)

            AuthQuery
                .updateUser(id, user)
                .then(updated => {
                    console.log('verified successfully >> ', updated) 
                    res.status(200).json(updated) 
                })
                .catch(err => {
                    return next(err)
                }) 
        })
        .catch(err => {
            console.log('error while verifying user >> ', err)
            return next(err) 
        })      
}

module.exports = {
    find,
    insertUser,
    login,
    verifyUser
}