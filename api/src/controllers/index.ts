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
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


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
      const novoCarro = await prisma.car.create({
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