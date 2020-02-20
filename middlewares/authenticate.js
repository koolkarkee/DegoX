const JWT = require('jsonwebtoken')
const config = require('./../configs')

module.exports = function(req, res, next){
    let token;
    if(req.headers['x-access-token']){
        token = req.headers['x-access-token']
    }
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    if(req.headers['token']){
        token = req.headers['token']
    }
    if(req.query.token){
        token = req.query.token
    }

    if(!token){
        next({
            msg : 'token not provided',
            status : 400
        })
    }

    //verify the token
    JWT.verify(token, config.JWT_secret, (err, decoded) => {
        if(err){
            return next(err)
        }
       
        console.log('decoded value >> ', decoded)
        req.loggedInUser = decoded
        //by pass the middleware
        next()
    })
}