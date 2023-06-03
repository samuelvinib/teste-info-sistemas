import { NextFunction, Request, Response, Router } from "express";
import { createCar } from "../../controllers";

function createNewCar(req: Request, res: Response) {
  return createCar();
}

export const routes = Router();

routes
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await createNewCar(req, res);
      res.json(car);
    } catch (error) {
      next(error);
    }
  });
