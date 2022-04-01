const request = require('request')
const constants = require('../lib/constants')
var fs = require('fs')
const fetch = require('node-fetch')

function plot(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${constants.loginUserUrl}${uniqueid}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        const data = await response.json();
        console.log(req.body.password, data.password,"=-=-=-=-")
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    plot
};