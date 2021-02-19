import express from "express";
import socketio, { Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import routes from "./routes";

import { addUser, getUser, removeUser, getRoomUsers } from "./utils/users";

interface User {
  userName: string;
  roomTitle: string;
}

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
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
  socket.emit("message", {
    id: uuidv4(),
    user: "ChatBot",
    text: "Welcome, user !",
    time: format(new Date(), "h:mm a"),
  });

  // warn all other users when a new user connects
  socket.broadcast.emit("message", {
    id: uuidv4(),
    user: "ChatBot",
    text: "A new user has joined",
    time: format(new Date(), "h:mm a"),
  });

  // runs when user disconnects
  socket.on("disconnect", () => {
    io.emit("disconnectMessage", {
      id: uuidv4(),
      user: "ChatBot",
      text: "User has left",
      time: format(new Date(), "h:mm a"),
    });
  });

  // Listen to the chatMessage event from client
  socket.on("inputMessage", (message: Message) => {
    io.emit("sendMessage", message);
    console.log(message);
  });
});

app.use(routes);

server.listen(3333, () => console.log("server is running"));
