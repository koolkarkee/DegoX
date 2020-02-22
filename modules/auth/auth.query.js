const UserQuery = require('./../user/user.query')

const token = require('./auth.hasher')
const passwordHash = require('password-hash')

function insertUser(data){
    console.log("request body", data)

    return new Promise((resolve, reject) => {
         //check if the user with the same username already exists
        UserQuery
        .find({ username : data.username })
        .then(user => {
            if(!user){
                //proceed to register
                //hash the password before inserting user 
                user.password =  passwordHash.generate(user.password)

                //save the user
                UserQuery
                .insert(user)
                .then(success => {
                    resolve(success)
                })
                .catch(err => {
                    reject(err)
                })
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}

function login(data){

}

function find(){
    return new Promise((resolve, reject) => {
        resolve({ msg : "not implemented", status : 404 })
    })
}

module.exports = {
    insertUser,
    login,
    find
}
