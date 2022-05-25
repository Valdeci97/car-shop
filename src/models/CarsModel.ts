import { Schema, model as CreateModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document {}

const CarSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class CarModel extends MongoModel<Car> {
  constructor(model = CreateModel('Cars', CarSchema)) { super(model); }
}
