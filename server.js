const express = require("express");
const connectDB = require("./config/db");
const WebSocket = require("ws");
const cors = require("cors");
const dotenv = require("dotenv");

const wss = new WebSocket.Server({ port: 8080 });

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
console.log("server has started listening on port 8080");

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("message", function incoming(message) {
    const messageData = JSON.parse(message);
    ws.send(`Server: ` + messageData);
    console.log("direct message recived from client: " + messageData);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
  ws.send("You are connected to the server");
});
app.listen(port, () => console.log(`Server started on port ${port}`));
module.exports = app; // export app to be used by test
