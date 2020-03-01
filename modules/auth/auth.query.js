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

function verifyUser(emailToken){
    return UserQuery.find({ emailToken : emailToken}) 
}

function updateUser(id, user){
    console.log('user in user query >> ', user)
    return UserQuery.update(id, user)
}

module.exports = {
    insertUser,
    login,
    find,
    verifyUser,
    updateUser
}
