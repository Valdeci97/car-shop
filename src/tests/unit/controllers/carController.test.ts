import sinon from 'sinon';
import chai from 'chai';
import chaiHtpp = require('chai-http');
import CarController from '../../../controllers/CarController';
import server from '../../../server';
import CarModel from '../../../models/CarModel';

import { createdCar, validCar, invalidCar, cars, carById, updatedCar } from './mocks';

const { expect } = chai;
chai.use(chaiHtpp);
const controller = new CarController();

describe('Testando o método de criação do controller de carros', () => {
  const app = server.getApp();
  let model = new CarModel();
  describe('Teste da função create', () => {
    describe('Sucesso ao criar o carro', () => {
      before(async () => { sinon.stub(model, 'create').resolves(createdCar as any) });
      after(() => { (model.create as sinon.SinonStub).restore(); });

      it('Deve retornar um status http 201', async () => {
        const chaiHtppResponse = await chai.request(app).post(controller.route).send(validCar);
        expect(chaiHtppResponse.status).to.be.equal(201);
        expect(chaiHtppResponse.body).to.be.an('object');
        expect(chaiHtppResponse.body).to.not.have.own.property('__v');
      });
    });

    describe('Não tem sucesso ao criar o carro', () => {
      before(async() => { sinon.stub(model, 'create').resolves({ error: {} } as any) });
      after(() => { (model.create as sinon.SinonStub).restore() });

      it('Deve retornar um status http 400', async () => {
        const chaiHtppResponse = await chai.request(app).post(controller.route).send(invalidCar);
        expect(chaiHtppResponse.status).to.be.equal(400);
        expect(chaiHtppResponse.body).to.be.an('object');
        expect(chaiHtppResponse.body).to.have.own.property('error');
      });      
    });

    describe('Teste middleware erro global no controller de carros', () => {
      before(async() => { sinon.stub(model, 'create').rejects(new Error); });
      after(() => { (model.create as sinon.SinonStub).restore() });
      it('Esperado Status 500', async () => {
        const chaiHtppResponse = await chai.request(app).post(controller.route).send(validCar);
        expect(chaiHtppResponse.status).to.be.equal(500);
        expect(chaiHtppResponse.body).to.be.an('object');
        expect(chaiHtppResponse.body).to.have.own.property('error');
        expect(chaiHtppResponse.body.error).to.be.equal('Internal server error');
        });
    });
  });
});

describe('Testando o método de leitura do controller de carros', () => {
  const app = server.getApp();
  let model = new CarModel();
  describe('Lendo os carros que existem no banco de dados', () => {
    before(async () => sinon.stub(model, 'read').resolves(cars as any));
    after(() => (model.read as sinon.SinonStub).restore());
    it('Deve retornar status htpp 200', async () => {
      const chaiHtppResponse = await chai.request(app).get(controller.route);
      expect(chaiHtppResponse.status).to.be.equal(200);
      expect(chaiHtppResponse.body).to.be.an('array').to.have.length(2);
    });
  });

  describe('Teste middleware erro global no controller de carros', () => {
      before(async() => { sinon.stub(model, 'read').rejects(new Error); });
      after(() => { (model.read as sinon.SinonStub).restore() });
      it('Esperado Status 500', async () => {
        const chaiHtppResponse = await chai.request(app).post(controller.route).send(validCar);
        expect(chaiHtppResponse.status).to.be.equal(500);
        expect(chaiHtppResponse.body).to.be.an('object');
        expect(chaiHtppResponse.body).to.have.own.property('error');
        expect(chaiHtppResponse.body.error).to.be.equal('Internal server error');
        });
    });
});

describe('Testando o método de leitura pro id', () => {
  const app = server.getApp();
  let model = new CarModel();
  describe('Passando um id existente no banco de dados', () => {
    before(async () => { sinon.stub(model, 'readOne').resolves(carById as any) });
    after(() => (model.readOne as sinon.SinonStub).restore());

    it('Deve retornar status htpp 200', async () => {
      const chaiHtppResponse = await chai.request(app).get(`${controller.route}/${carById._id}`);
      expect(chaiHtppResponse.status).to.be.equal(200);
      expect(chaiHtppResponse.body).to.be.an('object').to.have.own.property('buyValue');
    });
  });

  describe('Passando um id inexistente no banco de dados', () => {
    before(async () => { sinon.stub(model, 'readOne').resolves({} as any) });
    after(() => (model.readOne as sinon.SinonStub).restore());

    it('Deve retornar status htpp 404', async () => {
      const chaiHtppResponse = await chai.request(app).get(`${controller.route}/${carById._id!}`);
      expect(chaiHtppResponse.status).to.be.equal(404);
      expect(chaiHtppResponse.body).to.be.an('object').to.have.own.property('error');
    });
  });

  describe('Teste middleware erro global no controller de carros', () => {
      before(async() => { sinon.stub(model, 'readOne').rejects(new Error); });
      after(() => { (model.readOne as sinon.SinonStub).restore() });
      it('Esperado Status 500', async () => {
        const chaiHtppResponse = await chai.request(app).post(controller.route).send(validCar);
        expect(chaiHtppResponse.status).to.be.equal(500);
        expect(chaiHtppResponse.body).to.be.an('object');
        expect(chaiHtppResponse.body).to.have.own.property('error');
        expect(chaiHtppResponse.body.error).to.be.equal('Internal server error');
        });
    });
});

describe('Testando o método de atualização do controller de carros', () => {
  const app = server.getApp();
  let model = new CarModel();
  describe('Atualiza o carro com sucesso', () => {
    before(async() => { sinon.stub(model, 'update').resolves(updatedCar as any); });
    after(() => { (model.update as sinon.SinonStub).restore() });

    it('Deve retornar status htpp 200', async () => {
      const chaiHtppResponse = await chai.request(app).put(`${controller.route}/${updatedCar._id}`).send(validCar);
      expect(chaiHtppResponse.status).to.be.equal(200);
      expect(chaiHtppResponse.body).to.be.an('object').to.have.own.property('seatsQty');
    });
  });

  describe('Passa um id que não existe no banco de dados', () => {
    before(async() => { sinon.stub(model, 'update').resolves({} as any); });
    after(() => { (model.update as sinon.SinonStub).restore() });

    it('Deve retornar status htpp 404', async () => {
      const chaiHtppResponse = await chai.request(app).put(`${controller.route}/${updatedCar._id!}`).send(validCar);
      expect(chaiHtppResponse.status).to.be.equal(404);
      expect(chaiHtppResponse.body).to.be.an('object').to.have.own.property('error');
    });
  });

  describe('Teste middleware erro global no controller de carros', () => {
      before(async() => { sinon.stub(model, 'readOne').rejects(new Error); });
      after(() => { (model.readOne as sinon.SinonStub).restore() });
      it('Esperado Status 500', async () => {
        const chaiHtppResponse = await chai.request(app).post(controller.route).send(validCar);
        expect(chaiHtppResponse.status).to.be.equal(500);
        expect(chaiHtppResponse.body).to.be.an('object');
        expect(chaiHtppResponse.body).to.have.own.property('error');
        expect(chaiHtppResponse.body.error).to.be.equal('Internal server error');
        });
    });
});
