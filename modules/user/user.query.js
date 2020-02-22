const UserModel = require('./user.model')
const UserMapper = require('./user.mapper')

function insert(data){  
    return (UserMapper(new UserModel({}), data)).save().exec()
}

function find(condition){
    return UserModel.find(condition).exec()
}

function update(id, data, condition){
    return (UserMapper(new UserModel({}), data)).update(condition, { upsert : true }, {}).exec()
}   

function remove(){
    //return UserModel.findByIdAndRemove(id).exec() 
    return new Promise((resolve, reject) => { reject({ msg : "not implemented", status : 404 }) })
}

module.exports = {
    insert, 
    find,
    update,
    remove
}