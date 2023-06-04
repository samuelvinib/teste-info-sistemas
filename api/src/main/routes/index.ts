import { NextFunction, Request, Response, Router } from "express";
import { createCar, getCars, updateCar, deleteCar } from "../../controllers";

export const routes = Router();

routes
  .route('/:id?')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await getCars(req, res);
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
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await updateCar(req, res);
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