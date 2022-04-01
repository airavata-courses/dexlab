let redis_clients;

module.exports.services = {

  init: (redis_connection) => {
        redis_clients = redis_connection;
    },
  /**
   * 
   * @param {string} key - redis key to get
   */
  get: function (key) {
    return new Promise((resolve, reject) => {
      redis_clients.get(key, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  /**
   * 
   * @param {string} key - redis key to get
   */
  hget: function (key, property) {
    return new Promise((resolve, reject) => {
      redis_clients.hget(key, property, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },
  /**
   * 
   * @param {string} key - redis key to get
   */
  set: function (key, value) {
    return new Promise((resolve, reject) => {
      redis_clients.set(key, value, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  /**
   * 
   * @param {string} key - redis key to set
   * @param {string} expiryTime - Expiry time of the redis key
   * @param {string} value - value to be stored in the key
   */
  setex: function (key, expiryTime, value) {
    return new Promise((resolve, reject) => {
      redis_clients.setex(key, expiryTime, value, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  /**
   * 
   * @param {string} key - redis key to get
   */
  hmset: function (key, values) {
    return new Promise((resolve, reject) => {
      redis_clients.hmset(key, values, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  /**
   * 
   * @param {string} key - redis key to get
   */
  expire: function (key, expiry) {
    return new Promise((resolve, reject) => {
      redis_clients.expire(key, expiry, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  /**
   * 
   * @param {string} key - redis key to get
   */
  ttl: function (key) {
    return new Promise((resolve, reject) => {
      redis_clients.ttl(key, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },


  hgetall: function (key) {
    return new Promise((resolve, reject) => {
      redis_clients.hgetall(key, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  /**
   * 
   * @param {string} key - redis key to get
   */
  hset: function (key, prop, value) {
    return new Promise((resolve, reject) => {
      redis_clients.hset(key, prop, value, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  },

  hsetcb: function (key, prop, value, cb) {
    redis_clients.hset(key, prop, value, (error, response) => {
      if (error) {
        return cb(error, null);
      } else {
        return cb(null, response);
      }
    })
  },

  /**
   * 
   * @param {string} key - redis key to get
   */
  hdel: function (key, field) {
    return new Promise((resolve, reject) => {
      redis_clients.hdel(key, field, (error, response) => {
        if (error) reject(error);
        resolve(response);
      });
    })
  }
}