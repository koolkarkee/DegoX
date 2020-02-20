var router = require('express').Router()
const UserModel = require('./../models/user.model')
const MapUserReq = require('./../mappers/mapuser')

router.route('/')
.get((req, res, next) => {
    console.log('req.loggedInUser from user route >> ', req.loggedInUser)
    //console.log('get all users >> ')
    //get all users 
    UserModel
        .find({}) //second parameter is project to specifically select a property
        .sort({ _id : -1}) //sorts by time desc
        .exec()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => { 

})
.put((req, res, next) => {
    
})


router.route('/change-password')
.get((req, res, next) => {
    res.send('from user change password')
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})
.put((req, res, next) => {
    
})

router.route('/profile')
.get((req, res, next) => {
    res.send('from user profile')
})
.post((req, res, next) => {
    
})
.delete((req, res, next) => {
    
})
.put((req, res, next) => {
    
})

router.route('/:id')
.get((req, res, next) => {
    UserModel
        .findOne({ _id : req.params.id })
        .exec()
        .then(data => {
            if(data == null) { //no user condition
                return next("user not found") 
            }
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        }) 
})
.delete((req, res, next) => {
    UserModel
        .findOne({ _id : req.params.id}) 
        .exec((err, user) => {
            if(!user){
                //return next(err)
                return next({ msg : "user not found" })
            }
            //remove user
            user.remove((err, removed) => {
                if(err) return next(err)
                
                res.status(200).json(removed)
            }) 
        })
})
.put((req, res, next) => {
    UserModel
        .findById(req.params.id, (err, user) => {
            if(err) return next(err)
            if(user == null) return next({ msg : "user does not exist"})
            //update
            //user mongoose object 
            MapUserReq(user, req.body) //change here
            user.save((err, done) => {
                if(err) return next(err)
                res.status(200).json(done)
            })
        })
})

module.exports = router