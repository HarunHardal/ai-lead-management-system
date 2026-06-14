const { Queue } = require("bullmq");
const redis = require("../config/redis");

const leadQueue = new Queue("lead-processing", {
  connection: redis
});

module.exports = leadQueue;