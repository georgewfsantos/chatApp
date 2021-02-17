import express from "express";
import socketio, { Socket } from "socket.io";
import http from "http";
import cors from "cors";

import routes from "./routes";

import { addUser, getUser, removeUser, getRoomUsers } from "./utils/users";

interface User {
  userName: string;
  roomTitle: string;
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

/* 
- socket.emit => to the connecting client ( the user);
- socket.broadcast => to all clients but the one connecting;
-io.emit => to all clients 
*/

// upon new client connection:

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to the room");

  // warn all other users when a new user connects
  socket.broadcast.emit("message", "A new user has joined");

  // runs when user disconnects
  socket.on("disconnect", () => {
    io.emit("message", "The user has left");
  });

  // Listen to the chatMessage event from client
  socket.on("inputMessage", (message: string) => {
    io.emit("message", message);
  });
});

app.use(routes);

server.listen(3333, () => console.log("server is running"));
