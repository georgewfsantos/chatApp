import express from "express";
import socketio, { Socket } from "socket.io";
import http from "http";
import cors from "cors";

import routes from "./routes";

import { addUser, getUser, removeUser, getRoomUsers } from "./utils/users";

interface SocketParameters {
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

io.on("connection", (socket: Socket) => {
  socket.on("join", ({ userName, roomTitle }: SocketParameters, callback) => {
    const { error, user } = addUser({ id: socket.id, userName, roomTitle });

    if (error) {
      return error;
    }

    if (user) {
      socket.emit("message", {
        user: "admin",
        text: `Welcome to the room ${user.roomTitle}, ${user.userName}`,
      });
      socket.broadcast.to(user.roomTitle).emit("message", {
        user: "admin",
        text: `${user.userName} has just joined.`,
      });

      socket.join(user.roomTitle);
    }

    callback();
  });

  socket.on("sendMessage", (message: string, callback: () => void) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.roomTitle).emit("message", {
        user: user.userName,
        text: message,
      });
    }

    callback();
  });

  socket.on("user_disconnect", () => {
    console.log("user has disconnected from the app");
  });
});

app.use(routes);

server.listen(3333, () => console.log("server is running"));
