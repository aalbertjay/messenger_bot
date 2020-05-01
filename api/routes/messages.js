var express = require('express');
var login = require('facebook-chat-api');

var router = express.Router();
router.post('/', function(req, res, next) {
    loginAndSendMessage(req.body);
    res.send('logging in');
});

const loginAndSendMessage = credentials => {
    login_email = credentials['email'];
    login_password = credentials['password'];
    recipientsString = credentials['recipients'];
    message = credentials['message'];

    if (!(login_email && login_password && recipientsString && message)) {
        return console.error('All fields must be filled in');
    }
    return login({email: login_email, password: login_password}, (err, api) => {
        if (err) {
            switch (err.error) {
                // 2FA enabled
                case 'login-approval':
                    console.log('Enter 2FA code > ');
                        rl.on('line', (line) => {
                            err.continue(line);
                            rl.close();
                        });
                        break;
                default:
                    console.error(err);
            }
            return err;
        }

        // Send dat message
        recipients = recipientsString.split(',');
        recipients.map(name =>
            api.getUserID(name, (err, data) => {
                if(err) return console.error(err);

                var threadID = data[0].userID;
                api.sendMessage(message, threadID);
            })
        );
    });
}

module.exports = router;