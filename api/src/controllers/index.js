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
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
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
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    try {
        // Extrair os dados do carro do corpo da requisição
        const carData = {
            placa,
            chassi,
            renavam,
            modelo,
            marca,
            ano,
        };
        // Executar o upload do arquivo utilizando o middleware do multer
        upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ocorreu um erro no upload do arquivo.' });
            }
            const image = req.file;
            // Caminho completo da imagem
            const imagePath = path_1.default.join('images/', image.filename);
            // Criar o carro no banco de dados
            const novoCarro = yield prisma_1.default.car.create({
                data: Object.assign(Object.assign({}, carData), { imagens: {
                        create: {
                            nome: image.filename,
                            tamanho: image.size,
                            tipo: image.mimetype,
                            caminho: imagePath,
                        },
                    } }),
                include: {
                    imagens: true,
                },
            });
            return res.json(novoCarro);
        }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar o carro.' });
    }
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
