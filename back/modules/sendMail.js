const nodemailer = require('nodemailer');
let token = [];
//const urlFront= 'http://loginmtg.tassdar.ovh:8100/'; //URL DE PROD
const urlFront= 'http://localhost:8100/'; //URL DE DEV

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.tassadar.ovh@gmail.com',
        pass: 'Newton32.'
    }
});

const mailOptions = {
    from: 'noreply.tassadar.ovh@gmail.com',
    to: '',
    subject: '',
    text: ''
};

getTokenIdByMail = (mail) => {
    if (mail.length !== 0) {
        for (let i = 0; i < token.length; i++) {
            if (token[i].mail) {
                if (token[i].mail === mail) {
                    return i
                }
            }
        }
    }
    return -1;
};

clearToken = function (mail, k) {
    for (let i = k; i < token.length; i++) {
        if (token[i].mail === mail) {
            token.splice(i, 1);
        }
    }
};

module.exports.sendToken = function (mail, name, pass, con, id, res) {
    let mexists = 0;
    let nexists = 0;

    con.query('SELECT * FROM users', (err, result) => {
        if (err) {
            throw err
        } else {
            for (const line of result) {
                if (line.username === name) {
                    nexists = 1;
                } else {
                    if (line.email === mail) {
                        mexists = 1;
                    }
                }
            }
        }

        if (nexists === 0 && mexists === 0) {

            let data = {
                token: id,
                mail: mail
            }

            clearToken(mail, 0);
            token.push(data);

            mailOptions.to = mail;
            mailOptions.text =
                'Click on this link to confirm your account creation : ' + urlFront +
                'conf-account?token=' + id +
                '&mail=' + mail +
                '&name=' + name +
                '&password=' + pass;
            mailOptions.subject = 'Account creation';

            transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    res.json({message: 'Error: Invalid email address', output: 0});
                } else {
                    res.json({message: 'Check your mails (maybe in the spams)', output: 1});
                }
            });
        } else {
            if (nexists === 1) {
                res.json({message: 'Username already used', output: 0});
            } else {
                if (mexists === 1) {
                    res.json({message:'Email adress already used', output: 0});
                }
            }
        }
    });
}

module.exports.resetPassword = function (mail, token, con, res) {
    con.query("SELECT username, email FROM users WHERE email = ?", [mail], (err, result) => {
        if (err) {
            throw err
        } else {
            mailOptions.to = result[0].email;
            mailOptions.text =
                'Hello ' + result[0].username + ', here\'s the link to reset your password : ' + urlFront +
                'reset-password?' +
                'token=' + token +
                '&mail=' + result[0].email +
                '&name=' + result[0].username;
            mailOptions.subject = 'Reset';

            transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    res.json({message: 'Error: Invalid email address', output: 0});
                } else {
                    res.json({message: 'Check your mails (maybe in the spams)', output: 1});
                }
            });

        }
        if (mailOptions.to === '') {
            res.json({message: 'Email missing from database', output: 0});
        }
    });
}

module.exports.checkToken = function (mail, tokenInput, res) {
    for (let i = 0; i < token.length; i++) {
        if (token[i].token == tokenInput) {
            clearToken(mail, i);
            res.json({output: 1, message: 'Token validé'});
        } else {
            res.json({output: 0, message: 'Token invalide'});
        }
    }
}


