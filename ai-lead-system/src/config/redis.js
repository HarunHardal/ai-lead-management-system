const IORedis = require("ioredis");

const redis = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null
});

module.exports = redis;