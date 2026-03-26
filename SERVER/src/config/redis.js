import Redis from "ioredis";
import logger from "../utils/logger.js";

const redisUrl = process.env.REDIS_URL;

const noopRedis = {
    isReady: false,
    async get() {
        return null;
    },
    async setex() {
        return "OK";
    },
    async del() {
        return 0;
    },
};

const formatRedisError = (err) => {
    if (!err) {
        return { message: "Unknown Redis error" };
    }

    if (err.name === "AggregateError" && Array.isArray(err.errors) && err.errors.length > 0) {
        const first = err.errors[0];
        return {
            message: first?.message || err.message || "Redis connection failed",
            code: first?.code || err.code,
            stack: err.stack,
        };
    }

    return {
        message: err.message || "Redis connection failed",
        code: err.code,
        stack: err.stack,
    };
};

if (!redisUrl) {
    logger.warn("REDIS_URL not set. Continuing without Redis cache.");
}

const redis = redisUrl
    ? new Redis(redisUrl, {
          maxRetriesPerRequest: 1,
          enableReadyCheck: true,
          retryStrategy: () => null,
      })
    : noopRedis;

if (redisUrl) {
    redis.on("connect", () => {
        logger.info("Redis connected");
    });

    redis.on("error", (err) => {
        logger.error("Redis error", formatRedisError(err));
    });
}

export default redis;