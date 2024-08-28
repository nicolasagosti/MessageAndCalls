import moment from "moment";

import { socket } from "../socket.io/socket.io";

class Log {
    state: {};
    constructor() {
        this.state = { logs: [] };
    }

    postLog(message: string, clientId: string) {
        const messageObj = {
            message: message,
            date: moment().format("LLLL"),
        };
        this.setState({ logs: [...this.state.logs, messageObj] });
        let state = this.state;
        socket.emit("log-data", { state, clientId });
    }

    private setState(newState: Partial<{}>) {
        this.state = { ...this.state, ...newState };
    }
}

export default new Log();
