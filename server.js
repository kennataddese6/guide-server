const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
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
