import * as sinon from 'sinon';
import chai from 'chai';
import server, { carService, carController } from './mocks/server';
import { carById, cars, updatedCar, createdCar, validCar, invalidCar } from './mocks';

import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando o controller de carros', () => {
  describe('Verifica comportamento da função read em caso de sucesso', () => {
    before(async () => {
      sinon.stub(carService, 'read').resolves(cars);
    });

    after(() => (carService.read as sinon.SinonStub).restore());

    it('Deve retornar status http 200 e um array no corpo da requisição', async () => {
      const res = await chai.request(server.getApp()).get(carController.route);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array').to.have.length(2);
    });

    it(
      'A primeira posição do array é um objeto e não possui a chave de versão "__v"',
      async () => {
        const res = await chai.request(server.getApp()).get(carController.route);
        expect(res.body[0]).to.be.an('object').to.not.have.own.property('__v');
    });
  });

  describe('Verifica o comportamento da função read em caso de insucesso', () => {
    before(async () => {
      sinon.stub(carService, 'read').rejects();
    });

    after(() => (carService.read as sinon.SinonStub).restore());

    it('Deve retornar um status http 500 e um objeto com a propriedade error', async () => {
      const res = await chai.request(server.getApp()).get(carController.route);
      expect(res.status).to.be.equal(500);
      expect(res.body).to.be.an('object').to.have.own.property('error');
    });
  });

  describe('Verifica o funcionamento da função readOne em caso de sucesso', () => {
    before(async () => {
      sinon.stub(carService, 'readOne').resolves(carById);
    });

    after(() => (carService.readOne as sinon.SinonStub).restore());

    it('Deve retornar um status http 200 e um objeto', async () => {
      const res = await chai.request(server.getApp()).get(
        `${carController.route}/${carById._id}`
      );
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object').to.include.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'doorsQty',
        'seatsQty',
      ]);
    });
  });

  describe('Verifica o funcionamento da função readOne em caso de insucesso', () => {
    before(async () => {
      sinon.stub(carService, 'readOne').rejects();
    });

    after(() => (carService.readOne as sinon.SinonStub).restore());

    it(
      'É informado um id com comprimento diferente de 24 caracteres e retorna status http 400',
      async () => {
        const res = await chai.request(server.getApp()).get(`${carController.route}/1`);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.an('object').to.have.own.property('error');
    });

    it('Problema no banco de dados, deve retornar um status http 500', async () => {
      const res = await chai.request(server.getApp()).get(
        `${carController.route}/${carById._id}`
      );
      expect(res.status).to.be.equal(500);
      expect(res.body).to.be.an('object').to.have.own.property('error');
    });
  });

  describe('Verifica o funcionamento da função create em caso de sucesso', () => {
    before(async () => {
      sinon.stub(carService, 'create').resolves(createdCar);
    });

    after(() => (carService.create as sinon.SinonStub).restore());

    it('Deve retornar um status http 201 e um objeto do carro criado', async () => {
      const res = await chai.request(server.getApp()).post(carController.route)
        .send(validCar);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.an('object').to.not.have.own.property('__v');
    });
  });

  describe('Verifica o funcionamento da função create em caso de insucesso', () => {
    before(async () => {
      sinon.stub(carService, 'create').rejects();
    });

    after(() => (carService.create as sinon.SinonStub).restore());

    it('Envia um carro válido mas ocorre problema na criação do carro', async () => {
      const res = await chai.request(server.getApp()).post(carController.route)
        .send(validCar);
      expect(res.status).to.be.equal(500);
      expect(res.body).to.have.own.property('error');
    });
  });

  describe('Verifica o funcionamento da função update em caso de sucesso', () => {
    before(async () => {
      sinon.stub(carService, 'update').resolves(updatedCar);
    });

    after(() => (carService.update as sinon.SinonStub).restore());

    it('Deve retornar status http 200', async () => {
      const res = await chai.request(server.getApp()).put(
        `${carController.route}/${updatedCar._id}`
      ).send(validCar);
      expect(res.status).to.be.equal(200);
      expect(res.body).to.not.have.own.property('__v');
    });
  });

  describe('Verifica o funcionamento da função update em caso de insucesso', () => {
    before(async () => {
      sinon.stub(carService, 'update').resolves(null);
    });

    after(() => (carService.update as sinon.SinonStub).restore());

    it(
      'Deve retornar status http 400 pois o id tem comprimento diferente de 24 caracteres',
      async () => {
        const res = await chai.request(server.getApp()).put(`${carController.route}/1`)
          .send(validCar);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.own.property('error');
    });

    it('Deve retornar status 404 pois o id informado não existe', async () => {
      const res = await chai.request(server.getApp()).put(
        `${carController.route}/${updatedCar._id}`).send(validCar);
      expect(res.status).to.be.equal(404);
    });
  });

  describe('Verifica funcionamento da função delete em caso de sucesso', () => {
    before(async () => {
      sinon.stub(carService, 'delete').resolves(carById);
    });

    after(() => (carService.delete as sinon.SinonStub).restore());

    it('Deve retornar status http 204', async () => {
      const res = await chai.request(server.getApp()).delete(
        `${carController.route}/${updatedCar._id}`).send(validCar);
      expect(res.status).to.be.equal(204);
    });
  });

  describe('Verifica o funcionamento da função delete em caso de insucesso', () => {
    before(async () => {
      sinon.stub(carService, 'delete').resolves(null);
    });

    after(() => (carService.delete as sinon.SinonStub).restore());

    it(
      'Deve retornar status http 400 pois o id tem comprimento diferente de 24 caracteres',
      async () => {
        const res = await chai.request(server.getApp()).delete(`${carController.route}/1`)
          .send(validCar);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.own.property('error');
    });

    it('Deve retornar status 404 pois o id informado não existe', async () => {
      const res = await chai.request(server.getApp()).delete(
        `${carController.route}/${updatedCar._id}`).send(validCar);
      expect(res.status).to.be.equal(404);
    });
  });
});
