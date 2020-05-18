var express = require('express');
var login = require('facebook-chat-api');
const fs = require("fs");

var router = express.Router();
router.post('/', function(req, res, next) {
    if (fs.existsSync('appstate.json')) {
        authenticate({'appState': JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, res);
    } else {
        authenticate(req.body, res);
    }
    // loginAndSendMessage(req.body);
});

function authenticate(credentials, res) {
    login(credentials, (err, api) => {
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
            res.send('Wrong username/password');
            return err;
        }

        console.log('writing file');
        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
        res.send('Logged in');
    });
}

const loginAndSendMessage = credentials => {
    const login_email = credentials['email'];
    const login_password = credentials['password'];
    const recipientsString = credentials['recipients'];
    const message = credentials['message'];

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
        const recipients = recipientsString.split('\, ?');
        recipients.map(name => {
            
            api.getUserID(name, (err, data) => {
                if(err) return console.error(err);

                const threadID = data[0].userID;
                userMessage = message.replace("<name>", name);
                api.sendMessage(userMessage, threadID);
            });
        });
    });
}

module.exports = router;