import App from "./app";
import logger from "./logger";
import dotenv from "dotenv";
import socketServer from "./socket.io/socket.io";

dotenv.config();

const server = new App();

server
    .start()
    .then((serverListener) => {
        socketServer(serverListener, server.app);
    })
    .catch((err) => {
        logger.error(err);
    });
