import { Schema, model as CreateModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

export interface CarDocument extends Car, Document {}

const CarSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends MongoModel<Car> {
  constructor(model = CreateModel('Car', CarSchema)) { super(model); }
}

// fonte documentação mongoose: https://mongoosejs.com/docs/api.html#schema_Schema:~:text=%5Boptions.versionKey%3Dtrue%5D%20%C2%ABBoolean%C2%BB%20if%20false%2C%20exclude%20the%20version%20key%20(__v%20by%20default)%20from%20the%20output
