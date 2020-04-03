const Query = require('./logo.query') 
const FileHelper = require('../../../helpers/file.helper')

//params : req, res, next, Query, err, path, oldValues, fieldsToUpdate, 

function _updateData(req, res, next) {
    console.log('req body ready to update >> ', req.body)
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

function _removeDuplicateFile(next, err, path) {
    FileHelper
        .removeFile(path)
        .then(success => {
            console.log('successfully removed file at', path)

            return next(err)
        })
        .catch(fileErr => {
            return next(fileErr)
        })
}

function _skipFileRemovalAndUpdate(req, res, next) {
    //skip file operation  
    console.log('from skipping >> ', req.oldValues);
        
    req.body.name = req.body.name ? req.body.name : req.oldValues.name
    req.body.svgFile = req.oldValues.svgFile 

    _updateData(req, res, next) 
}

function _dontSkipFileRemovalAndUpdate(req, res, next) {
    console.log('from not skipping >> ', req.oldValues)
    //remove old file
    FileHelper
        .removeFile(req.oldValues.svgFile)
        .then(removed => {
            console.log('old file removed >> ', removed)

            //update new values relating to file
            req.body.name = req.body.name ? req.body.name : req.file.filename
            req.body.svgFile = req.file.destination + req.file.filename 
            
            _updateData(req, res, next) 
        })
        .catch(err => {
            //remove that same file in case of err
            _removeDuplicateFile(next, err, req.file.destination + req.file.filename) 
        }) 
}

function _startFileOperation(req, res, next) {
    if(req.file){ 
        _dontSkipFileRemovalAndUpdate(req, res, next)       
    } else { 
        _skipFileRemovalAndUpdate(req, res, next)
    } 
}

function findAndUpdate(req, res, next) { 
    var oldValues = {};
    Query
        .find({ _id : req.params.id })  
        .then(data => {
            oldValues = data[0] 
            console.log('old values from query >> ', oldValues)

            if(!oldValues){
                return next({
                    msg : 'no values, may have been already deleted. please check and try later',
                    status : 400
                }) 
            }else{ //start file operation for update
                req.oldValues = oldValues
                _startFileOperation(req, res, next)
            } 
        })
        .catch(err => {
            return next(err)
        })  
}

module.exports = {
    findAndUpdate
}
