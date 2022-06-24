import CarModel from '../../../../models/CarModel';
import CarService from '../../../../services/CarService';

export const model = new CarModel();
const service = new CarService(model);

export default service;
