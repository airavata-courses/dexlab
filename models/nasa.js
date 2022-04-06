const request = require('request')
const constants = require('../lib/constants')
var fs = require('fs')
const fetch = require('node-fetch')
const amqp = require('amqplib')
const redis = require('../utils/db').services
const {
    v4: uuidvv4
} = require('uuid');
const {
    monthsShort
} = require('moment')

function plot(data, cache_key) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data, new Date())
            console.log('')
            const uuid = uuidvv4();
            let connection = await amqp.connect('amqp://149.165.159.22');
            let rabbitmq = await connection.createChannel();
            let rabbit_q = await rabbitmq.assertQueue('', {
                exculsive: true
            })

            rabbitmq.sendToQueue('rpc_queue', Buffer.from(JSON.stringify(data)), {
                replyTo: rabbit_q.queue,
                correlationId: uuid
            })

            rabbitmq.consume(rabbit_q.queue, async (msg) => {
                if (msg.content.uuid == uuid) {
                    let b64 = Buffer.from(msg.content).toString('base64');
                    let mimeType = 'image/png';
                    connection.close();
                    let image = `<img src="data:${mimeType};base64,${b64}" />`
                    await redis.setex(cache_key, 10000000, image)
                    resolve(image);
                }
            }, {
                noAck: true
            })

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = {
    plot
};