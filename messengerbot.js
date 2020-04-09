const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var login_email = "";
var login_password = "";
var msg = "";
var recipients = [];

console.log("Welcome to the ANova mass DMer. Before you start, have a comma-separated list of your intended recipients, and \n" + 
    "the message that you want to send stored somewhere else.");
console.log("This is because the bot will make you restart the process if you enter your login credentials incorrectly oops\n");

// Prompt for login credentials, list of recipients, and message to send
rl.question("Enter your Facebook login email: ", function(email) {
    login_email = email;
    rl.question("Enter your Facebook password: ", function(pw) {
        login_password = pw;
        rl.question("Enter a list of your recipients. Use their full name as it appears on Facebook, and separate names with commas: ", function(recipientsString) {
            recipients = recipientsString.split(",");
            rl.question("Enter the message you want to send! ", function(messageToSend) {
                msg = messageToSend;
                rl.close();
            });
        });
    });
});


rl.on("close", function() {
    if (login_email && login_password) {
        login({email: login_email, password: login_password}, (err, api) => {
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
                return;
            }

            // Send dat message
            recipients.map(name =>
                api.getUserID(name, (err, data) => {
                    if(err) return console.error(err);

                    var threadID = data[0].userID;
                    api.sendMessage(msg, threadID);
                })
            );
        });
    }
});
