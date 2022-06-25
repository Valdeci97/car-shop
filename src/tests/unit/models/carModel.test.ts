import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import  CarModel from '../../../models/CarModel';

describe('Testando o model de carros', () => {
  const car = {
    _id: '62cg8Rh59olp1as48eh5ku26',
    model: 'fusca',
    year: 1984,
    color: 'Branco',
    buyValue: 14000,
    doorsQty: 2,
    seatsQty: 5,
  };

  const updatedCar = {
    ...car,
  };

  updatedCar.color = 'Preto';

  const carModel = new CarModel();

  describe('Verifica o comportamento da função create', () => {
    before(async () => stub(Model, 'create').resolves(car));
    after(() => (Model.create as SinonStub).restore());

    it('Retorna um objeto com o id do carro criado', async () => {
      const res = await carModel.create({
        model: 'fusca',
        year: 1984,
        color: 'Branco',
        buyValue: 14000,
        doorsQty: 2,
        seatsQty: 5,
      });
      expect(res).to.be.an('object').to.have.own.property('_id');
    });
  });

  describe('Verifica o comportamento da função read', () => {
    before(async () => stub(Model, 'find').resolves([car]));
    after(() => (Model.find as SinonStub).restore());

    it('Retorna um array com os carros no banco de dados', async () => {
      const res = await carModel.read();
      expect(res).to.be.an('array').to.have.length(1);
    });
  });

  describe('Verifica o comportamento da função readOne', () => {
    before(async () => stub(Model, 'findOne').resolves(car));
    after(() => (Model.findOne as SinonStub).restore());

    it('Retorna um objeto com o carro correspondente ao id recebido', async () => {
      const res = await carModel.readOne('62cg8Rh59olp1as48eh5ku26');
      expect(res).to.be.an('object');
    });
  });

  describe('Verifica o comportamento da função update', () => {
    before(async () => stub(Model, 'findOneAndUpdate').resolves(updatedCar));
    after(() => (Model.findOneAndUpdate as SinonStub).restore());

    it('Retorna um objeto atualizado do carro em questão', async () => {
      const res = await carModel.update('62cg8Rh59olp1as48eh5ku26', car);
      expect(res).to.be.an('object')
        .to.have.own.property('color')
          .to.be.equal('Preto');
    });
  });

  describe('Verifica o comportamento da função delete', () => {
    before(async () => stub(Model, 'findOneAndRemove').resolves(car));
    after(() => (Model.findOneAndRemove as SinonStub).restore());

    it('Retorna um objeto atualizado do carro em questão', async () => {
      const res = await carModel.delete('62cg8Rh59olp1as48eh5ku26');
      expect(res).to.be.an('object');
    });
  });
});
