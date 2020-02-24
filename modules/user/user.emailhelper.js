 //email verification code here
    //step 1 - create and store random guid
    //step 2 - send the email with the guid 

const uuidv1 = require('uuid/v1'); 
const emailHelper = require('./../../helpers/mailer.helper')
const config = require('./../../configs/index')

function getEmailRegistrationToken(){
    return  uuidv1()
}

function getRegistrationBodyHtml(emailToken){
    let link = config.IP + 'api/auth/verify?emailToken=' + emailToken
    var body = `<p> 
    Please click the link to confirm your registration below : <br/>
    <a href=" ${link}">${link}</a>
    </p>`

    return body
}

//set the token expiration
function getEmailTokenExpiryDate(){
    Date.prototype.addHours= function(){
        this.setHours(this.getHours()+ config.userEmailConfirmationTokenExpiryHours);
        return this;
    }
    return new Date().addHours() 
}

function sendRegistrationLink(email, user, emailToken){
    emailHelper
        .sendMail(null, email, "Email Registration Confirmation", "Confirm your email", getRegistrationBodyHtml(emailToken))
        .then(result => {
            console.log("Registration mail status : ", result)
        })
        .catch(err => {
            console.log("Registration mail err : " , err)
        })
}

module.exports = {
    getEmailRegistrationToken,
    getEmailTokenExpiryDate,
    sendRegistrationLink
}
     