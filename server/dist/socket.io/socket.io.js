"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("../logger"));
const socketServer = (server, app) => {
    logger_1.default.info("Socket server is running");
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    app.set("io", io);
    io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers["X-forwarded-for"] || req.socket.remoteAddress;
        logger_1.default.info(`User connected: ${socket.id} from ${ip}`);
        // we return our socket id to client
        socket.emit("socketId", socket.id);
        socket.on("log-data", (data) => {
            io.to(data.clientId).emit("log", data.state.logs);
        });
        socket.on("disconnect", () => {
            logger_1.default.info(`User disconnected: ${socket.id} from ${ip}`);
        });
    });
};
exports.default = socketServer;
