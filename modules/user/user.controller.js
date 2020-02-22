const UserQuery = require('./user.query')

function insert(req, res, next){
    UserQuery
        .insert(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log('error while inserting user >> ', err)
            return next(err)
        }) 
}

function find(req, res, next){
    var condition = {}
    UserQuery
        .find(condition)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while finding user >> ', err)
            return next(err)
        }) 
}

function findById(req, res, next){
    var condition = { _id : req.params.id }
    UserQuery
        .find(condition)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while finding user >> ', err)
            return next(err)
        }) 
}

function update(req, res, next){
    var condition = { _id : req.params.id }
    UserQuery
        .update(condition)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while updating user >> ', err)
            return next(err)
        }) 
}

function remove(req, res, next){ 
    var condition = { _id : req.params.id }
    UserQuery
        .remove(condition)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while removing user >> ', err)
            return next(err)
        }) 
}

function search(req, res, next){
    next({
        msg : "not implemented",
        status : 400
    })
}
 
module.exports = {
    insert,
    find,
    findById,
    update,
    remove,
    search
}