import express from "express";
import { routes } from "./main/routes";
require('dotenv').config();
import cors from 'cors';

export const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images',express.static('uploads'));
app.use("/cars",routes);

app.listen(port, () => {
  console.log('API rodando na porta ' + port);
});