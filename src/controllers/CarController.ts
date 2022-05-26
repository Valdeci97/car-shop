import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public async create(
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    try {
      const cars = await this.service.create(body);
      if (!cars) return res.status(500).json({ error: this.errors.internal });
      if ('error' in cars) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      return res.status(201).json(cars);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  public async readOne(
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idNotHexa });
      }
      const car = await this.service.readOne(id);
      if (!car) return res.status(404).json({ error: this.errors.notFound });
      return res.status(200).json(car);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  public async update(
    req: Request<{ id: string; } & Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> {
    const { body } = req;
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idNotHexa });
      }
      const updatedCar = await this.service.update(id, body);
      if (!updatedCar) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(updatedCar);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  public async delete(
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<Response | void | ResponseError> {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idNotHexa });
      }
      const updatedCar = await this.service.delete(id);
      if (updatedCar) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).end();
    } catch (err) {
      return res.status(500).end();
    }
  }
}