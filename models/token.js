const JWT = require('jsonwebtoken');
let moment = require("moment");

class Token {
    constructor(user_token) {
        this.user_token = user_token;
        this.decoded = undefined;
    }

    verify() {
        try {
            this.decoded = JWT.verify(this.user_token, process.env.tokenPassword, {
                ignoreExpiration: true
            });
            let expiry = moment.unix(this.decoded.iat).add(24, 'hours');
            if (expiry.isBefore(moment())) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }
}


let generateToken = (data) => {
    var token = JWT.sign(data, process.env.tokenPassword, {
        algorithm: 'HS256'
    });
    return token;
}

module.exports = {
    Token,
    generateToken
}