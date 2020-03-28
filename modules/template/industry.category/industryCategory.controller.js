const Query = require('./industryCategory.query')

function insert(req, res, next){
    console.log('request body >> ', req.body)
    Query
        .insert(req.body)
        .then(data => {            
            res.json(data)
        })
        .catch(err => {
            console.log('error while inserting data >> ', err)
            return next(err)
        }) 
}

function find(req, res, next){
    var condition = {}
    Query
        .find(condition)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while finding data >> ', err)
            return next(err)
        }) 
}

function findById(req, res, next){
    var condition = { _id : req.params.id }
    Query
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
    console.log('request params id >> ', req.params.id)
    
    Query
        .update(req.params.id, req.body)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while updating >> ', err)
            return next(err)
        }) 
}

function remove(req, res, next){ 
    Query
        .remove(req.params.id)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while removing >> ', err)
            return next(err)
        }) 
}

function search(req, res, next){
    console.log('search query >> ', req.query)
    
    var condition = { 
        name : {
            $regex : req.query.name,
            $options : "i"
        }
    }  

    Query
        .search(condition)
        .then(data => {
            res.json(data)
        }) 
        .catch(err => {
            console.log('error while searching >> ', err)
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
