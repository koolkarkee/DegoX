const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    //db modeling
    name : {
        type : String
    },
    username : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String, 
        unique : true
    },
    phone : {
        type : Number
    },
    address : {
        temporary_address : [String],
        permanent_address : String
    },
    dob : {
        type : Date
    },
    avatar : {
        type : String
    },
    gender : {
        type : String,
        enum : ['male', 'female', 'others']
    },
    role : {
        type : Number, 
        default : 1
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive'
    }
})

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel
