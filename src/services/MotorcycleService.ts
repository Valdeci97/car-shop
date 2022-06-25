import {
  Motorcycle,
  MotorcycleSchema,
} from '../interfaces/MotorcycleInterface';
import Service, { HttpException } from '.';
import MotorcycleModel from '../models/MotorcycleModel';

export default class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) { super(model); }

  public async create(
    obj: Motorcycle,
  ): Promise<Motorcycle | HttpException | null> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  }

  public async update(
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | HttpException | null> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, obj);
  }
}
