import express from "express";
import socketio from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new socketio.Server(server);

server.listen(5000);
