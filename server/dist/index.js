"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = __importDefault(require("./socket.io/socket.io"));
dotenv_1.default.config();
const server = new app_1.default();
server
    .start()
    .then((serverListener) => {
    (0, socket_io_1.default)(serverListener, server.app);
})
    .catch((err) => {
    logger_1.default.error(err);
});
