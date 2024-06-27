const express = require("express");
const cluster = require("cluster");
const os = require("os");

const totalCPU = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPU; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();
  const PORT = 3002;

  app.get("/", (req, resp) => {
    return resp.json(`Hello from server ${process.pid}`);
  });

  app.listen(PORT, () => {
    console.log(`Server listening at ${PORT} on process ${process.pid}`);
  });
}
