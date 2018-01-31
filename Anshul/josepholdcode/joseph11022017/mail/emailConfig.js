var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

module.exports = {
    emailShoot: function(emailTo, username, token) {
        // email 
        var emailFrom = 'this@company.com';
        var templateDir = './email_template';
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "navaidkitchen@gmail.com",
                pass: "navaidkitchennavaidkitchen"
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
    },

    forgetEmailShoot: function(customer, type) {

        console.log("customer");
        console.log(customer);
        if (type == 'cust') {
            customer['resetPassLink'] = 'http://34.209.114.118:4021/customer/resetpassword/'+customer._id;
        }else{
            customer['resetPassLink'] = 'http://34.209.114.118:4021/admin/resetpassword/'+customer._id;
        }
        // email 
        var emailFrom = 'this@company.com';
        var templateDir = './email_template';
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "navaidkitchen@gmail.com",
                pass: "navaidkitchennavaidkitchen"
            }
        });


        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/forgetPassword.ejs', {customer : customer},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: customer.firstname + " <" + customer.email + " >",
            subject: 'Reset Password',
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