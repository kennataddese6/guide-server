const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("server has started listening on port 8080");

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("message", function incoming(message) {
    ws.send("Got your message");
    console.log("received: %s", message);
  });
  ws.on("close", function close() {
    console.log("Client disconnected");
  });
  ws.send("Hello, client!");
});
