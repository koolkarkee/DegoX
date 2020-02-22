const UserModel = require('./user.model')
const UserMapper = require('./user.mapper')
const passwordHash = require('password-hash')

function mapUser(data){ 
    var result = new UserModel({})
    result = UserMapper(result, data)
    return result
}

function insert(data){   
    return mapUser(data).save()
}

function find(condition){
    return UserModel.find(condition).exec()
}

function update(id, data, condition){
    return mapUser(data).update(condition, { upsert : true }, {}) 
}   

function remove(){
    //return UserModel.findByIdAndRemove(id).exec() 
    return new Promise((resolve, reject) => { resolve({ msg : "not implemented", status : 404 }) })
}

function login(data){ 
    var model = mapUser(data) 
    
    return new Promise((resolve, reject) => {
        var condition = { username : model.username } 

        UserModel.findOne(condition, (err, user) => {
            if(err) 
                reject(err)
            if(user == null){ 
                reject({ msg : "Invalid User while logging in"})
            }    
            if(user != null){  
                var isMatch = passwordHash.verify(model.password, user.password)
                if(!isMatch){
                    reject({ msg : "invalid user/password"})
                }
        
                //password is now matched
                resolve(user) 
            } 
        })
    }) 
}

module.exports = { 
    insert, 
    find,
    update,
    remove,
    login
}