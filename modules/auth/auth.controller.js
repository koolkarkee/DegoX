const AuthQuery = require('./auth.query')

function find(req, res, next){
    console.log('from auth controller >> ')
    AuthQuery
        .find
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('from auth controller >> ', err)
            return next(err)
        })
}

function insertUser(req, res, next){
    AuthQuery
        .insertUser(req.body) 
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('error while registering user >> ', err)
            return next(err)
        })           
}

module.exports = {
    find,
    insertUser
}