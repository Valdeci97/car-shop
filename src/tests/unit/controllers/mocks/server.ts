import App from '../../../../app';
import CarModel from '../../../../models/CarModel';
import CarController from '../../../../controllers/CarController';
import { Car } from '../../../../interfaces/CarInterface';
import CarService from '../../../../services/CarService';
import CustomRouter from '../../../../routes/Router';

const server = new App();
const carModel = new CarModel();
export const carService = new CarService(carModel);
export const carController = new CarController(carService);
const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);
server.addRouter(carRouter.router);

export default server;
