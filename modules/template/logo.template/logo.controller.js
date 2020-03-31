const Query = require('./logo.query')

function insert(req, res, next){
    //TODO: file upload
    console.log('request body >> ', req.body)
    Query
        .insert(req.body)
        .then(data => {            
            res.status(200).json(data)
        })
        .catch(err => {
            console.log('error while inserting data >> ', err)
            return next(err)
        }) 
}

function getAll(req, res, next){
    var condition = {}
    Query
        .find(condition)
        .then(data => {
            res.status(200).json(data)
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
            res.status(200).json(data)
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
            res.status(200).json(data)
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
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while removing >> ', err)
            return next(err)
        }) 
}

function search(req, res, next){
    console.log('search query >> ', req.body)   
    console.log('industry category >> ', req.body.industryCategory)

    let conditionIndustryCategory =  {
        industryCategory : {
            $in : req.body.industryCategory
        } 
    }

    let conditionTheme =  {
        theme : {
            $regex : req.body.theme,
            $options : "i"
        }
    }

    let conditionName = {
        name : {
            $regex : req.body.name,
            $options : "i"
        }
    }
     
    var condition = { 
        $and : [conditionIndustryCategory, conditionTheme, conditionName] 
    }  

    Query
        .search(condition)
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(err => {
            console.log('error while searching >> ', err)
            return next(err)
        }) 
}

module.exports = {
    insert,
    find: getAll,
    findById,
    update,
    remove,
    search
}
