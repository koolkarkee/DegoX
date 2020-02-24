const UserModel = require('./user.model')
const UserMapper = require('./user.mapper')
const passwordHash = require('password-hash')
const userEmailHelper = require('./user.emailhelper')

function mapUser(data){ 
    var result = new UserModel({})
    result = UserMapper(result, data)
    return result
}

function insert(data){   
    //email verification process
     //step 1 - create and store random guid
    var myUser = UserMapper(new UserModel({}), data)

    //create uuid
    myUser.emailToken = userEmailHelper.getEmailRegistrationToken()

    //set token expirty date 
    myUser.emailTokenExpiryDate = userEmailHelper.getEmailTokenExpiryDate()

    console.log('user email token >> ', myUser.emailToken)
    console.log('token expirty date >>', myUser.emailTokenExpiryDate)

    //then save the user
    return myUser.save()
}

function find(condition){
    return UserModel.find(condition).sort({_id : -1}).exec()
}

function update(id, data){
    var condition = { _id : id }
    
    return new Promise((resolve, reject) => {
        UserModel.findOne(condition, (err, user) => {
            if(err) 
                reject(err)
            if(user == null)
                reject({ msg : "Invalid User" })
            else { 
                UserMapper(user, data) //update given values 
                user.save((err, result) => {
                    if(err)
                        reject(err)
                    
                    resolve(result)
                }) 
            }
        })
    })
}   

function remove(id){ 
    var condition = { _id : id }
    return new Promise((resolve, reject) => {
        UserModel.findOne(condition).exec((err, user) => { 
            if(err) 
                reject(err)
            if(user == null)
                reject({ msg : "User does not exist already" })
            else { 
                user.remove((err, removed) => {
                    if(err)
                        reject(err)
                    resolve(removed)
                })
            }
        })
    })
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

function search(condition){
    return UserModel.find(condition).exec() 
}

module.exports = { 
    insert, 
    find,
    update,
    remove,
    login
}