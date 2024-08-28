import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import notFound from "./middlewares/notFound";
import exception from "./middlewares/exception";

import SMSRoutes from "./routes/sms.route";
import CallRoutes from "./routes/call.route";
import logger from "./logger";

const PORT = process.env.PORT || 3001;

class App extends http.Server {
    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        super(app);
        this.app = app;
    }

    private setRouter() {
        this.app.use("/sms", SMSRoutes);
        this.app.use("/call", CallRoutes);
        // this.app.use(notFound);
        // this.app.use(exception);
    }

    private setMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.setRouter();
    }

    async start() {
        this.setMiddleware();
        this.app.set("port", PORT);
        return this.app.listen(this.app.get("port"), () => {
            logger.info(
                `Server is running on: http://localhost:${this.app.get("port")}`
            );
        });
    }
}

export default App;
