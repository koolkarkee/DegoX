const nodemailer = require('./nodemail.helper')

function sendMail(from, to, subject, text, html){
    nodemailer(from, to, subject, text, html)
        .then(result => {
            console.log('mail sent', result)
        })
        .catch(err => {
            console.log('mail not sent', err)
        })
}

module.exports = {
    sendMail
}