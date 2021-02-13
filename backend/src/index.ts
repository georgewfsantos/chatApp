import express from "express";
import socketio from "socket.io";
import http from "http";

import routes from "./routes";

const app = express();

const server = http.createServer(app);
const io = new socketio.Server(server);

io.on("connection", (socket) => {
  console.log("a new user has connected to the app");

  socket.on("disconnect", () => {
    console.log("user has desconnected from the app");
  });
});

app.use(routes);

server.listen(3333, () => console.log("server is running"));
