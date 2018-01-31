var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

// email 
var emailFrom = 'this@company.com';
var templateDir = __dirname + '/email_template';
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "navaidkitchen@gmail.com",
        pass: "navaidkitchennavaidkitchen"
    } 
});


module.exports = {
    emailShoot: function(emailTo, username, token) {

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
        sendmail(options);
    },

    forgetEmailShoot: function(user) {
        if(user.role=='Admin')
        {
            //user['resetPassLink'] = 'http://34.209.114.118:3000/admin/resetpassword/'+user._id;
            user['resetPassLink'] = 'http://localhost:4200/admin/resetpassword/'+user._id;
        }
        else
        {
            //user['resetPassLink'] = 'http://34.209.114.118:3000/resetpassword/'+user._id;
            user['resetPassLink'] = 'http://localhost:4200/resetpassword/'+user._id;
        }
    
        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/forgetPassword.ejs', {user : user},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: user.firstname + " <" + user.email + " >",
            subject: 'Reset Password',
            html: html,
            text: 'text'
        };
        sendmail(options);
        
    }
};

function sendmail(options){
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