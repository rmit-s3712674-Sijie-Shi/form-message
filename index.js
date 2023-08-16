import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
  socket.on("chat message", (msg) => {
    console.log("chat msg: " + msg)
    io.emit('chat message', msg);
  });
});

server.listen(2333, () => {
  console.log("listening on port 2333");
});
