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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
exports.routes = (0, express_1.Router)();
exports.routes
    .route('/:id?')
    .get((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield (0, controllers_1.getCars)(req, res);
        return car;
    }
    catch (error) {
        next(error);
    }
}));
exports.routes
    .route('/')
    .post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield (0, controllers_1.createCar)(req, res);
        return car;
    }
    catch (error) {
        next(error);
    }
}));
exports.routes
    .route('/:id')
    .put((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield (0, controllers_1.updateCar)(req, res);
        return car;
    }
    catch (error) {
        next(error);
    }
}));
exports.routes
    .route('/:id')
    .delete((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield (0, controllers_1.deleteCar)(req, res);
        return car;
    }
    catch (error) {
        next(error);
    }
}));
