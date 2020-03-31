const Model = require('./logo.model')
const Mapper = require('./logo.mapper')

function map(data) {
    var result = new Model({})
    result = Mapper(result, data)
    return result
}

function insert(data) {
    var insertData = new Model({})
    insertData = map(data)  

    console.log('inserting data >> ', insertData)
    return new Promise((resolve, reject) => {
        insertData.save((err, done) => {
            if(err)
                reject(err)
            resolve(done)
        })
    }) 
}

function find(condition) {
    return Model.find(condition).sort({_id : -1}).exec()
}

function update(id, data) {
    var condition = { _id : id } 
    
    return new Promise((resolve, reject) => {
        Model.findByIdAndUpdate(condition, data, { new : true }, (err, result) => {
            if(err) 
                reject(err)
            if(result == null)
                reject({ msg : "Invalid data for Logo" }) 
            else {  
                resolve(result)
            }
        })
    })
}

function remove(id) {
    var condition = { _id : id } 
    return new Promise((resolve, reject) => {
        Model.findByIdAndDelete(condition, (err, result) => {
            if(err) 
                reject(err)
            if(result == null)
                reject({ msg : "Invalid data for Logo" })
            else { 
                resolve({ msg : 'successfully removed'})
            }
        })
    })
}

function search(condition) {
    console.log('search condition >> ', condition)
    return find(condition) 
}

module.exports = {
    insert,
    find,
    update,
    remove,
    search
}