const UserQuery = require('./../user/user.query')

function insertUser(data){
    console.log("request body", data) 
    return UserQuery.insert(data)
}

function login(data){
    return UserQuery.login(data) 
}

function find(){
    return new Promise((resolve, reject) => {
        resolve({ msg : "not implemented", status : 200 })
    })
}

module.exports = {
    insertUser,
    login,
    find
}
