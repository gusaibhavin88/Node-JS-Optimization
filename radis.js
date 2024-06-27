const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

// Create a Redis client
const client = redis.createClient();

// Connect to Redis
client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route to set a key-value pair in Redis
app.post("/set", (req, res) => {
  const { key, value } = req.body;
  client.set(key, value, (err, reply) => {
    if (err) {
      return res.status(500).send("Error setting key in Redis");
    }
    res.send(`Key set: ${reply}`);
  });
});

// Simple route to get a value from Redis by key
app.get("/get/:key", (req, res) => {
  const key = req.params.key;
  client.get(key, (err, reply) => {
    if (err) {
      return res.status(500).send("Error getting key from Redis");
    }
    if (reply) {
      res.send(`Value: ${reply}`);
    } else {
      res.status(404).send("Key not found");
    }
  });
});

// Route to clear the Redis cache
app.post("/clear", (req, res) => {
  client.flushall((err, reply) => {
    if (err) {
      return res.status(500).send("Error clearing Redis cache");
    }
    res.send("Redis cache cleared");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
