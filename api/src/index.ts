import express from "express";
import { logger } from "./main/log";
import { routes } from "./main/routes";
require('dotenv').config();
import connection from "./db/dbConfig";

export const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

connection.connect((err:any) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
  
  // Iniciar a aplicação
  app.listen(port, () => {
    console.log('API rodando na porta ' + port);
  });
});