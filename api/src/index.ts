import express from "express";
import { routes } from "./main/routes";
require('dotenv').config();

export const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('imagens',express.static('uploads'));
app.use(routes);

app.listen(port, () => {
  console.log('API rodando na porta ' + port);
});