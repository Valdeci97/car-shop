import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { HttpException } from '.';
import CarModel from '../models/CarModel';

export default class CarService extends Service<Car> {
  constructor(model = new CarModel()) { super(model); }

  public async create(obj: Car): Promise<Car | HttpException | null> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  }

  public async update(
    id: string,
    obj: Car,
  ): Promise<Car | HttpException | null> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, obj);
  }
}