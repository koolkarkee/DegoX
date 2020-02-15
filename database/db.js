const mongoose = require('mongoose')
const dbConfig = require('./../configs/db.config')

mongoose.connect(dbConfig.connectionUrl + '/' + dbConfig.dbName, 
    { useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true } , (err, success) => {
    if(err){
        console.log('connection err >> ', err)
    }else{
        console.log('successfully connected with database : >> ' + dbConfig.dbName)
    } 
})