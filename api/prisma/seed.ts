import { PrismaClient, Car, Image } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const car1: Car = await prisma.car.create({
    data: {
      placa: 'ABC1234',
      chassi: '123456789',
      renavam: '123456789',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2020,
      imagens: {
        create: [
          {
            nome: 'imagem1.jpg',
            tamanho: 1024,
            tipo: 'jpeg',
            caminho: 'images/imagem1.jpg',
          },
          {
            nome: 'imagem2.jpg',
            tamanho: 2048,
            tipo: 'jpeg',
            caminho: 'images/imagem2.jpg',
          },
        ],
      },
    },
  });

  const car2: Car = await prisma.car.create({
    data: {
      placa: 'DEF5678',
      chassi: '987654321',
      renavam: '987654321',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2021,
      imagens: {
        create: [
          {
            nome: 'imagem3.jpg',
            tamanho: 4096,
            tipo: 'jpeg',
            caminho: 'images/imagem3.jpg',
          },
          {
            nome: 'imagem4.jpg',
            tamanho: 8192,
            tipo: 'jpeg',
            caminho: 'images/imagem4.jpg',
          },
        ],
      },
    },
  });

  const car3: Car = await prisma.car.create({
    data: {
      placa: 'GHI9012',
      chassi: '246813579',
      renavam: '135792468',
      modelo: 'Corolla',
      marca: 'Toyota',
      ano: 2022,
      imagens: {
        create: [
          {
            nome: 'imagem5.jpg',
            tamanho: 16384,
            tipo: 'jpeg',
            caminho: 'images/imagem5.jpg',
          },
          {
            nome: 'imagem6.jpg',
            tamanho: 32768,
            tipo: 'jpeg',
            caminho: 'images/imagem6.jpg',
          },
        ],
      },
    },
  });
  
  const car4: Car = await prisma.car.create({
    data: {
      placa: 'JKL3456',
      chassi: '369258147',
      renavam: '258147369',
      modelo: 'Fiesta',
      marca: 'Ford',
      ano: 2023,
      imagens: {
        create: [
          {
            nome: 'imagem7.jpg',
            tamanho: 65536,
            tipo: 'jpeg',
            caminho: 'images/imagem7.jpg',
          },
          {
            nome: 'imagem8.jpg',
            tamanho: 131072,
            tipo: 'jpeg',
            caminho: 'images/imagem8.jpg',
          },
        ],
      },
    },
  });
  

  console.log('Dados populados com sucesso:', { car1, car2, car3, car4 });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });