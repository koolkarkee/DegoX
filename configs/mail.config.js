var smtpConfig = {
    host : "mail.neptouch.com",
    port : 25,
    secure : false,  
    auth : {
        user : "bibek.karki@neptouch.com",
        pass : "neptouch@123"
    }
}

module.exports = {
    smtpConfig,
    from : smtpConfig.auth.user
} 