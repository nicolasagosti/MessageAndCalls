"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const sms_route_1 = __importDefault(require("./routes/sms.route"));
const call_route_1 = __importDefault(require("./routes/call.route"));
const logger_1 = __importDefault(require("./logger"));
const PORT = process.env.PORT || 3001;
class App extends http_1.default.Server {
    constructor() {
        const app = (0, express_1.default)();
        super(app);
        this.app = app;
    }
    setRouter() {
        this.app.use("/sms", sms_route_1.default);
        this.app.use("/call", call_route_1.default);
        // this.app.use(notFound);
        // this.app.use(exception);
    }
    setMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.setRouter();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setMiddleware();
            this.app.set("port", PORT);
            return this.app.listen(this.app.get("port"), () => {
                logger_1.default.info(`Server is running on: http://localhost:${this.app.get("port")}`);
            });
        });
    }
}
exports.default = App;
