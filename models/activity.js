const constants = require('../lib/constants')
const fetch = require('node-fetch')

async function getActivity(data, orm_token) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(orm_token)
            const response = await fetch(`${constants.activityGetUrl}${data.uniqueid}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Authorization': `Bearer ${orm_token}`
                }
            });
            console.log(response, `Bearer ${orm_token}`)
            if (response.status == 200) {
                let value = await response.json();
                body = value;
                body.history = true
                resolve(body)
            } else {
                resolve({
                    "history": false,
                    "message": "No history"
                })
            }
        } catch (error) {
            console.log(error, new Date(), '\n')
            reject(error)
        }
    })
}

async function setActivity(headers, data, orm_token) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(orm_token)
            const response = await fetch(`${constants.activitySetUrl}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Authorization': `Bearer ${orm_token}`
                },
                body: JSON.stringify({
                    userID: headers.uniqueid,
                    userLogs: data
                })
            });
            resp = {
                status: response.status,
                flag: false
            }
            if (response.status == 200) {
                resp.flag = true
                resolve(resp)
            } else {
                resolve(resp)
            }
        } catch (error) {
            console.log(error, new Date(), '\n')
            reject(error)
        }
    })
}

module.exports = {
    getActivity,
    setActivity
};