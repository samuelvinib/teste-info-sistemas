import { Sequelize, DataTypes, Model } from 'sequelize';

// Crie uma instância do Sequelize com as configurações do banco de dados
const sequelize = new Sequelize('infosistemas', 'info', 'sistemas', {
  host: 'localhost',
  dialect: 'mysql',
});

// Defina o modelo da tabela de carros
interface CarAttributes {
  id?: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

class Car extends Model<CarAttributes> implements CarAttributes {
  public id?: number;
  public placa!: string;
  public chassi!: string;
  public renavam!: string;
  public modelo!: string;
  public marca!: string;
  public ano!: number;
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chassi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    renavam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Car',
  }
);

// Defina o modelo da tabela de imagens
interface ImageAttributes {
  id?: number;
  nome: string;
  tamanho: number;
  tipo: string;
  caminho: string;
  carroId: number;
}

class Image extends Model<ImageAttributes> implements ImageAttributes {
  public id?: number;
  public nome!: string;
  public tamanho!: number;
  public tipo!: string;
  public caminho!: string;
  public carroId!: number;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caminho: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Car',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Image',
  }
);

// Sincronize os modelos com o banco de dados (cria as tabelas se elas não existirem)
(async () => {
  await sequelize.sync({ force: true }); // force: true para recriar as tabelas

  // Insira os dados iniciais (seeding)
  await Car.bulkCreate([
    { placa: 'ABC1234', chassi: '123456789', renavam: '123456789', modelo: 'Gol', marca: 'Volkswagen', ano: 2020 },
    { placa: 'DEF5678', chassi: '987654321', renavam: '987654321', modelo: 'Civic', marca: 'Honda', ano: 2021 },
  ]);

  await Image.bulkCreate([
    { nome: 'imagem1.jpg', tamanho: 1024, tipo: 'jpeg', caminho: '/caminho/para/imagem1.jpg', carroId: 1 },
    { nome: 'imagem2.jpg', tamanho: 2048, tipo: 'jpeg', caminho: '/caminho/para/imagem2.jpg', carroId: 2 },
  ]);

  console.log('Tabelas de carros e imagens criadas e dados populados com sucesso!');
})();
