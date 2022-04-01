let {
    Token
} = require("../models/token");

function validator(headers) {
    return new Promise((resolve, reject) => {
        console.log("In here");
        const user_token = headers.token;
        const uniqueid = headers.uniqueid;

        if (!user_token) {
            resolve({
                "validated": false,
                "status": 400,
                "message": {
                    message: "Token Required"
                }
            });
        }
        if (!uniqueid) {
            resolve({
                "validated": false,
                "status": 400,
                "message": {
                    message: "uniqueid Required"
                }
            });
        }

        let token = new Token(user_token);

        if (token.verify()) {
            console.log(token)
            if (token.decoded.uniqueid == uniqueid) {
                resolve({
                    "validated": true
                });
            } else {
                resolve({
                    "validated": false,
                    "status": 401,
                    "message": {
                        message: "Invalid request"
                    }
                });
            }
        } else {
            resolve({
                "validated": true,
                "status": 419,
                "message": {
                    message: "Token Expired"
                }
            });
        }
    });
}

module.exports = {
    validator
};