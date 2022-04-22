const Redis = require("ioredis");
let redis_services = require("../utils/db.js").services;
let runtime = {
    db: {}
};

module.exports.init = async () => {
    console.log("Connecting to redis")
    runtime.db.redis = Redis.createClient({
        "host": process.env.redisIp,
        "port": "6379",
        // "password": process.env.redis_password
    });
    redis_services.init(runtime.db.redis);
}