import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import prisma from "../db/prisma";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

export const getCars = async (req: Request, res: Response) => {
  const carId  = parseInt(req.params.id);
  try {
    if (carId) {
      const existingCar = await prisma.car.findUnique({
        where: { id: Number(carId) },
      });

      if (!existingCar) {
        return res.status(404).json({ message: 'Car not found' });
      }

      const car = await prisma.car.findUnique({
        where: { id: Number(carId) }, // Converta o ID para número, se necessário
        include: {
          imagens: true,
        },
      });
      return res.status(200).json(car);
    }
    const car = await prisma.car.findMany({
      include: {
        imagens: true,
      },
    });
    return res.status(200).json(car);
  } catch (error) {
    throw error;
  }
};

const upload = multer({ storage }).array('images', 5);

export const createCar = async (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocorreu um erro no upload das imagens.' });
    }

    const { placa, chassi, renavam, modelo, marca, ano } = req.body;
    const anoInt = parseInt(ano, 10);

    try {
      const images = req.files as Express.Multer.File[];

      if (images.length < 1) {
        return res.status(400).json({ error: 'É necessário fornecer pelo menos uma imagem.' });
      }

      const novoCarro = await prisma.car.create({
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o carro.' });
    }
  });
};



export const updateCar = async (req: Request, res: Response) => {
  const carId = parseInt(req.params.id);
  const { placa, chassi, renavam, modelo, marca, ano } = req.body;
  console.log(req.body)

  try {
    // Verifica se o carro existe antes de atualizá-lo
    const existingCar = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!existingCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Atualiza os dados do carro
    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data: { placa, chassi, renavam, modelo, marca, ano },
    });

    return res.status(200).json(updatedCar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCar = async (req: Request, res: Response)=>{
  const carId = parseInt(req.params.id);

  try {
    // Verifica se o carro existe antes de deletá-lo
    const car = await prisma.car.findUnique({
      where: { id: carId },
      include: { imagens: true },
    });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Deleta as imagens relacionadas ao carro
    await prisma.image.deleteMany({
      where: { carroId: carId },
    });

    // Deleta o carro
    await prisma.car.delete({
      where: { id: carId },
    });

    return res.status(200).json({ message: 'Car and images deleted successfully', car });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect(); // Fecha a conexão do Prisma após a execução
  }
}