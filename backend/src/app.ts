import express from "express";
import socketio from "socket.io";
import http from "http";
// import cors from "cors";

import routes from "./routes";

interface SocketParameters {
  userName: string;
  roomTitle: string;
}

const app = express();
// app.use(cors());

const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a new user has connected to the app");

  socket.on("join", ({ userName, roomTitle }: SocketParameters) => {
    console.log(userName, roomTitle);
  });

  socket.on("disconnect", () => {
    console.log("user has disconnected from the app");
  });
});

app.use(routes);

server.listen(3333, () => console.log("server is running"));
