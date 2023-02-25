import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: 6379,
});

const redisDemo = async () => {
  // Connect to Redis at 127.0.0.1, port 6379.

  try {
    // Set key "myname" to have value "Simon Prickett".
    await redisClient.set("trpc", "Simon Prickett");
    console.log("redis client connected!!");
  } catch (e) {
    console.log("error");
    await redisClient.quit();
  }
};

void redisDemo();

export default redisClient;
