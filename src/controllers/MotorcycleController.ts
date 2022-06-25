import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(service = new MotorcycleService(), route = '/motorcycles') {
    super(service);
    this._route = route;
  }

  public get route() { return this._route; }

  public create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const bike = await this.service.create(body);
      if (!bike) return res.status(500).json({ error: this.errors.internal });
      if ('error' in bike) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      return res.status(201).json(bike);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idNotHexa });
      }
      const bike = await this.service.readOne(id);
      if (!bike) return res.status(404).json({ error: this.errors.notFound });
      return res.status(200).json(bike);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: Request<{ id: string; } & Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idNotHexa });
      }
      const bike = await this.service.update(id, body);
      if (!bike) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in bike) return res.status(400).json(bike);
      return res.status(200).json(bike);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<Response | void | ResponseError> => {
    const { id } = req.params;
    try {
      if (id.length !== 24) {
        return res.status(400).json({ error: this.errors.idNotHexa });
      }
      const bike = await this.service.delete(id);
      if (!bike) return res.status(404).json({ error: this.errors.notFound });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
