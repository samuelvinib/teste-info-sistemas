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
            caminho: 'imagens/imagem1.jpg',
          },
          {
            nome: 'imagem2.jpg',
            tamanho: 2048,
            tipo: 'jpeg',
            caminho: 'imagens/imagem2.jpg',
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
            caminho: 'imagens/imagem3.jpg',
          },
          {
            nome: 'imagem4.jpg',
            tamanho: 8192,
            tipo: 'jpeg',
            caminho: 'imagens/imagem4.jpg',
          },
        ],
      },
    },
  });

  console.log('Dados populados com sucesso:', { car1, car2 });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });