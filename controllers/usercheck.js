const constants = require('../lib/constants')
const fetch = require('node-fetch')

async function check(emailid) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${constants.emailCheckAPI}${emailid}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            });
            if (response.status == 200) {
                let value = await response.json();
                resolve(value.Found)
            }
        } catch (error) {
            console.log(error)
            resolve(false)
        }
    })
}

module.exports = {
    check
}