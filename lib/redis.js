const { Redis } = require("ioredis");

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("REDIS_URL is not defined");
};

module.exports.redis = new Redis(getRedisUrl());
