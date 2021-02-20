import express from "express";
import socketio, { Socket } from "socket.io";
import http from "http";
import cors from "cors";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import routes from "./routes";

import { addUser, getUser, removeUser, getRoomUsers } from "./utils/users";

interface JoinRoomValues {
  id: string;
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
  // runs when user submits userName and roomTitle
  socket.on("joinRoom", ({ userName, roomTitle }: JoinRoomValues) => {
    const addedUser = addUser({ id: socket.id, userName, roomTitle });

    const { user } = addedUser;

    if (user) {
      socket.join(user?.roomTitle);

      // emit welcome message
      socket.emit("message", {
        id: uuidv4(),
        user: "ChatBot",
        text: `Welcome, ${user?.userName}`,
        time: format(new Date(), "h:mm a"),
      });

      // warn all other users when a new user connects
      socket.broadcast.to(user?.roomTitle).emit("message", {
        id: uuidv4(),
        user: "ChatBot",
        text: `${user?.userName} has joined`,
        time: format(new Date(), "h:mm a"),
      });

      // users and room info
      io.to(user.roomTitle).emit("roomUsers", {
        room: user.roomTitle,
        users: getRoomUsers(user.roomTitle),
      });
    }
  });

  // Listen to the chatMessage event from client
  socket.on("inputMessage", (message: Message) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user?.roomTitle).emit("sendMessage", message);
      console.log(message);
    }
  });

  // runs when user disconnects
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.roomTitle).emit("message", {
        id: user.id,
        user: "ChatBot",
        text: `${user.userName} has left`,
        time: format(new Date(), "h:mm a"),
      });

      // users and room info
      io.to(user.roomTitle).emit("roomUsers", {
        room: user.roomTitle,
        users: getRoomUsers(user.roomTitle),
      });
    }
  });
});

app.use(routes);

server.listen(3333, () => console.log("server is running"));
