const IndustryCategoryModel = require('./industryCategory.model')
const IndustryCategoryMapper = require('./industryCategory.mapper')

function map(data){
    var result = new IndustryCategoryModel({})
    result = IndustryCategoryMapper(result, data)
    return result
}

function insert(data) {
    var insertData = new IndustryCategoryModel({})
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

function find(condition){
    return IndustryCategoryModel.find(condition).sort({_id : -1}).exec()
}

function update(id, data){
    var condition = { _id : id } 
    
    return new Promise((resolve, reject) => {
        IndustryCategoryModel.findByIdAndUpdate(condition, data, { new : true }, (err, industryCategory) => {
            if(err) 
                reject(err)
            if(industryCategory == null)
                reject({ msg : "Invalid data for Industry Category" }) 
            else {  
                resolve(industryCategory)
            }
        })
    })
}

function remove(id){
    var condition = { _id : id } 
    return new Promise((resolve, reject) => {
        IndustryCategoryModel.findByIdAndDelete(condition, (err, industryCategory) => {
            if(err) 
                reject(err)
            if(industryCategory == null)
                reject({ msg : "Invalid data for Industry Category" })
            else { 
                resolve({ msg : 'successfully removed'})
            }
        })
    })
}

function search(condition){
    console.log('search condition >> ', condition)
    return IndustryCategoryModel.find(condition).sort({ _id : -1 }).exec() 
}

module.exports = {
    insert,
    find,
    update,
    remove,
    search
}