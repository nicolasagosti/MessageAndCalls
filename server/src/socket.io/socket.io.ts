import * as http from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import logger from "../logger";

const socketServer = (server: http.Server, app: express.Application) => {
    logger.info("Socket server is running");
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    app.set("io", io);
    io.on("connection", (socket: Socket) => {
        const req = socket.request;
        const ip = req.headers["X-forwarded-for"] || req.socket.remoteAddress;
        logger.info(`User connected: ${socket.id} from ${ip}`);

        // we return our socket id to client
        socket.emit("socketId", socket.id);

        socket.on("log-data", (data) => {
            io.to(data.clientId).emit("log", data.state.logs);
        });

        socket.on("disconnect", () => {
            logger.info(`User disconnected: ${socket.id} from ${ip}`);
        });
    });
};

export default socketServer;
