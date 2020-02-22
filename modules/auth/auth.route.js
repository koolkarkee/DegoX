var express = require('express')
var router = express.Router() 

var authController = require('./auth.controller')
 
// router.get('/', (req, res, next) => {
//     res.status(200).json({ msg : "Ok"})
// })

router.route('/')
    .get(authController.find)

router.route('/register')
    .get(authController.find)
    .post(authController.insertUser) 
     

// router.post('/login',  (req, res, next) => {
//     UserModel.findOne({
//         username : req.body.username
//     }, (err, user) => {
//         if(err){
//             next(err)
//         }
//         if(user == null){
//             return next({
//                 msg : "Invalid user/password"
//             })
//         }
//         var isMatch = passwordHash.verify(req.body.password, user.password)
//         if(!isMatch){
//             return next({
//                 msg : "Invalid user/password"
//             })
//         } else { //password is matched
//             var token = createToken({
//                 name : user.username,
//                 _id : user.id,
//                 role : user.role
//             })
//              res.status(200).json({
//                 user,
//                 token
//              })
//         }
//     })
// })


module.exports = router