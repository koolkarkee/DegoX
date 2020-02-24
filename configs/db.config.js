const mongodb = require('mongodb')

const client = mongodb.MongoClient
const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'test1' 

module.exports = {
    mongodb, client, connectionUrl, dbName
}