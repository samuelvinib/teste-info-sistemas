import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import prisma from "../db/prisma";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Car } from '@prisma/client';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


export const listAllCars = async (req:any) => {
  try {
    var allDeposits = await prisma.car.findMany({
      include:{
        imagens:true
      }
    })
    return allDeposits;
  } catch (error) {
    throw error
  }
}

export const createCar = async (req: Request, res: Response) => {
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
    upload.single('image')(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ocorreu um erro no upload do arquivo.' });
      }

      const image = req.file as Express.Multer.File;

      // Caminho completo da imagem
      const imagePath = path.join('images/', image.filename);

      // Criar o carro no banco de dados
      const novoCarro: Car = await prisma.car.create({
        data: {
          ...carData,
          imagens: {
            create: {
              nome: image.filename,
              tamanho: image.size,
              tipo: image.mimetype,
              caminho: imagePath,
            },
          },
        },
        include: {
          imagens: true,
        },
      });

      return res.json(novoCarro);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar o carro.' });
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

    return res.status(200).json({ message: 'Car and images deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect(); // Fecha a conexão do Prisma após a execução
  }
}