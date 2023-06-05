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
exports.deleteCar = exports.updateCar = exports.createCar = exports.getCars = void 0;
const multer_1 = __importDefault(require("multer"));
const prisma_1 = __importDefault(require("../db/prisma"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = parseInt(req.params.id);
    try {
        if (carId) {
            const existingCar = yield prisma_1.default.car.findUnique({
                where: { id: Number(carId) },
            });
            if (!existingCar) {
                return res.status(404).json({ message: 'Car not found' });
            }
            const car = yield prisma_1.default.car.findUnique({
                where: { id: Number(carId) },
                include: {
                    imagens: true,
                },
            });
            return res.status(200).json(car);
        }
        const car = yield prisma_1.default.car.findMany({
            include: {
                imagens: true,
            },
        });
        return res.status(200).json(car);
    }
    catch (error) {
        throw error;
    }
});
exports.getCars = getCars;
const upload = (0, multer_1.default)({ storage }).array('images', 5);
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Ocorreu um erro no upload das imagens.' });
        }
        const { placa, chassi, renavam, modelo, marca, ano } = req.body;
        const anoInt = parseInt(ano, 10);
        try {
            const images = req.files;
            if (images.length < 1) {
                return res.status(400).json({ error: 'É necessário fornecer pelo menos uma imagem.' });
            }
            const novoCarro = yield prisma_1.default.car.create({
                data: {
                    placa,
                    chassi,
                    renavam,
                    modelo,
                    marca,
                    ano: anoInt,
                    imagens: {
                        create: images.map((image) => ({
                            nome: image.filename,
                            tamanho: image.size,
                            tipo: image.mimetype,
                            caminho: `images/${image.filename}`,
                        })),
                    },
                },
                include: {
                    imagens: true,
                },
            });
            return res.json({ message: "Criado com sucesso!", novoCarro });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar o carro.' });
        }
    }));
});
exports.createCar = createCar;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = parseInt(req.params.id);
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    console.log(req.body);
    try {
        // Verifica se o carro existe antes de atualizá-lo
        const existingCar = yield prisma_1.default.car.findUnique({
            where: { id: carId },
        });
        if (!existingCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // Atualiza os dados do carro
        const updatedCar = yield prisma_1.default.car.update({
            where: { id: carId },
            data: { placa, chassi, renavam, modelo, marca, ano },
        });
        return res.status(200).json(updatedCar);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = parseInt(req.params.id);
    try {
        // Verifica se o carro existe antes de deletá-lo
        const car = yield prisma_1.default.car.findUnique({
            where: { id: carId },
            include: { imagens: true },
        });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // Deleta as imagens relacionadas ao carro
        yield prisma_1.default.image.deleteMany({
            where: { carroId: carId },
        });
        // Deleta o carro
        yield prisma_1.default.car.delete({
            where: { id: carId },
        });
        return res.status(200).json({ message: 'Car and images deleted successfully', car });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    finally {
        yield prisma_1.default.$disconnect(); // Fecha a conexão do Prisma após a execução
    }
});
exports.deleteCar = deleteCar;
