const UserQuery = require('./../user/user.query')

function insertUser(data){
    console.log("request body", data) 
    return UserQuery.insert(data)
}

function login(data){
    return UserQuery.login(data) 
}

function find(condition){ 
    return UserQuery.find(condition)
}

module.exports = {
    insertUser,
    login,
    find
}
