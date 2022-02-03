const request = require('request')
const constants = require('../lib/constants')

function getActivity(data) {
    return new Promise((resolve, reject) => {
        const options = {
            url: `${constants.activityGetUrl}${data.uniqueid}`,
            method: "GET",
            headers: {
                token: "jbasdjbj"
            }
        }
        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            } else if (response.statusCode == 200) {
                body = JSON.parse(body);
                body.history = true
                resolve(body)
            } else if (response.statusCode == 400) {
                resolve({
                    "history": false,
                    "message": "No history"
                })
            }
        })
    })
}

function setActivity(headers, data) {
    return new Promise((resolve, reject) => {
        const options = {
            url: `${constants.activitySetUrl}`,
            method: "POST",
            headers: {
                token: "jbasdjbj"
            },
            body: {
                userID: headers.uniqueid,
                userLogs: data
            },
            json: true
        }
        request(options, (error, response, body) => {
            console.log(error, body, response.statusCode)
            if (error) {
                console.log(error)
                reject(error)
            } else if (response.statusCode == 200) {
                resolve(true)
            } else if (response.statusCode == 400) {
                resolve(false)
            }
        })
    })
}

module.exports = {
    getActivity,
    setActivity
};