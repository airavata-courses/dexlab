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
                    // 'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTYW5rZXQiLCJleHAiOjE2NDg4Mjc2MTEsImlhdCI6MTY0ODc0MTIxMX0.R2m4lfl9pL-w1iBgOnSkhaXc588WzVwLgU4Dq4-TP00soyDHjDsMVJgKIMmUVM3p3y2jMY2SaO7bvtQ6eBN0_A`
                }
            });
            if (response.status == 200) {
                let value = await response.json();
                body = value;
                body.history = true
                resolve(body)
            } else if (response.status == 400) {
                resolve({
                    "history": false,
                    "message": "No history"
                })
            }
        } catch (error) {
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
            reject(error)
        }
    })
}

module.exports = {
    getActivity,
    setActivity
};