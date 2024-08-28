import { io } from "socket.io-client";
import { SERVER_URL } from "../services/config";

export const socket = io(SERVER_URL);
