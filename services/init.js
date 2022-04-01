const Redis = require("ioredis");
let redis_services = require("../utils/db.js").services;
let runtime = {
    db: {}
};

module.exports.init = () => {
    console.log("Connecting to redis")
    runtime.db.redis = Redis.createClient({
        "host": "127.0.0.1",
        "port": "6379",
        // "password": process.env.redis_password
    });
    redis_services.init(runtime.db.redis);
}