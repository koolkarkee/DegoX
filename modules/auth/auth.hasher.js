var passwordHash = require('password-hash')
const JWT = require('jsonwebtoken')
const config = require('../../configs')

module.exports = function createToken(data){ //generating jwt token
    return JWT.sign(data, config.JWT_secret) 
}
  