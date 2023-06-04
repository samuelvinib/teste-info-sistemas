import { NextFunction, Request, Response, Router } from "express";
import { createCar, listAllCars, deleteCar } from "../../controllers";

export const routes = Router();

routes
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await listAllCars(req);
      res.json(car);
    } catch (error) {
      next(error);
    }
  });

routes
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await createCar(req, res);
      res.json(car);
    } catch (error) {
      next(error);
    }
  });

routes
  .route('/:id')
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await deleteCar(req, res);
      res.json(car);
    } catch (error) {
      next(error);
    }
  });