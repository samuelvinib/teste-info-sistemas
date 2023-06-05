"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./main/routes");
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 3000;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use('/cars/images', express_1.default.static('uploads'));
exports.app.use("/cars", routes_1.routes);
exports.app.listen(port, () => {
    console.log('API rodando na porta ' + port);
});
