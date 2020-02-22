module.exports = function(req, res, next){
    //check for authorization
    if(req.loggedInUser.role == 1){
        next()
    }else {
        next({
            msg : "unauthorized access",
            status : 400
        })
    }
}