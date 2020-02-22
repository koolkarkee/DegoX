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
    console.log('request body in update >> ', req.body)
    UserQuery
        .update(req.params.id, req.body)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while updating user >> ', err)
            return next(err)
        }) 
}

function remove(req, res, next){ 
    UserQuery
        .remove(req.params.id)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while removing user >> ', err)
            return next(err)
        }) 
}

function search(req, res, next){
    var condition = {  } //search params here
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
 
module.exports = {
    insert,
    find,
    findById,
    update,
    remove,
    search
}