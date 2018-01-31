var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

module.exports = {
    emailShoot: function(emailTo, username, token) {
        // email 
        var emailFrom = 'this@company.com';
        var templateDir = '../api/email_template';
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "derekitchen@gmail.com",
                pass: "derekitchen123"
            }
        });


        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/register.ejs', { username: username, token: token },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'subject',
            html: html,
            text: 'text'
        };
        transporter.sendMail(options, function(error, info) {
            if (error) {
                console.log('Message not sent');
                console.log(error);
                return false;
            } else {
                console.log('Message sent Successfully !!!');
                return true;
            };
        });

    }
};