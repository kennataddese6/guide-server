const express = require("express");
const connectDB = require("./config/db");
const WebSocket = require("ws");
const cors = require("cors");
const dotenv = require("dotenv");

const wss = new WebSocket.Server({ noServer: true });
const clients = new Map();
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));

console.log("Server is listening on port", port);

wss.on("connection", function connection(ws, req) {
  console.log("Client connected");

  ws.on("message", function incoming(message) {
    const messageData = JSON.parse(message);
    const email = messageData.email;
    const content = messageData.content;
    const address = messageData.address;
    console.log("here is the content", content);
    console.log("Incoming message from the client:", email);
    console.log("address to be sent", address);
    clients.set(email, ws);
    // Send personalized messages to a specific client
    clients.forEach(function (clientWs, clientEmail) {
      console.log("Here are the connected users", clientEmail);
      if (clientEmail === address) {
        clientWs.send("Hello, Client A!: " + content);
      }
    });
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
    clients.forEach(function (clientWs, clientEmail) {
      if (clientWs === ws) {
        clients.delete(clientEmail);
      }
    });
  });
});

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

module.exports = app; // Export app to be used by tests
