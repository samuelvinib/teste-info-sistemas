import { Request, Response } from "express";
import { logger } from "../main/log";

export const createCar = (req: Request)=>{
  const host = req.hostname;
  return `O host da aplicação é: ${host}`;
}