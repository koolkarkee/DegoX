const Fs = require('fs')
const Path = require('path')

function isValidFileFormat(mimetypeToValidate, file, rootDirectory, filePath){
     //check for file format
     var result = 'false'

     if(file){ 
        var filemimetype = file.mimetype    

        if(filemimetype.split('/')[1] != mimetypeToValidate.split('/')[1]){
             //delete file
            var path = Path.join(rootDirectory, filePath)
            
            Fs.unlink(path, err => {
                if(err){
                    console.log('unlink failed >> ', err) 
                }else {
                    console.log('file deleted')
                    result = 'true'
                }
            })  
        }else{
            result = 'true'
        }

        console.log('result >> ', result)
        return result
    }
}

function remove(filePath, rootDirectory) {
    return new Promise((resolve, reject) => {
        var path = Path.join(rootDirectory, filePath)

        Fs.unlink(path, err => {
            reject(err)
        })
        resolve({ msg : 'file removed'})
    })
}

module.exports = {
    isValidFileFormat,
    remove
}