import { stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/MotorcycleModel';

enum bikeTypes {
  Street = 'Street',
  Custom = 'Custom',
  Trail = 'Trail',
};

describe('Testando o model de motocicletas', () => {
  const bike = {
    _id: '15vfgt8r52w5e49fgter4523',
    model: 'Cg titan',
    year: 2012,
    color: 'vermelha',
    status: true,
    buyValue: 12500,
    category: bikeTypes.Street,
    engineCapacity: 160,
  };

  const updatedbike = { ...bike };

  updatedbike.color = 'azul';

  const motorcycleModel = new MotorcycleModel();

  describe('Verifica o comportamento da função create', () => {
    before(async () => stub(Model, 'create').resolves(bike));
    after(() => (Model.create as SinonStub).restore());

    it('Retorna um objeto com o id do carro criado', async () => {
      const res = await motorcycleModel.create({
        model: 'Cg titan',
        year: 2012,
        color: 'vermelha',
        status: true,
        buyValue: 12500,
        category: 'Street',
        engineCapacity: 160,
      });
      expect(res).to.be.an('object').to.have.own.property('_id');
    });
  });

  describe('Verifica o comportamento da função read', () => {
    before(async () => stub(Model, 'find').resolves([bike]));
    after(() => (Model.find as SinonStub).restore());

    it('Retorna um array com todos as motos no banco de dados', async () => {
      const res = await motorcycleModel.read();
      expect(res).to.be.an('array').to.have.length(1);
    });
  });

  describe('Verifica o comportamento da função readOne', () => {
    before(async () => stub(Model, 'findOne').resolves(bike));
    after(() => (Model.findOne as SinonStub).restore());

    it('Retorna um objeto de uma moto correspondente ao id recebido', async () => {
      const res = await motorcycleModel.readOne('15vfgt8r52w5e49fgter4523');
      expect(res).to.be.an('object');
    });
  });

  describe('Verifica o comportamento da função update', () => {
    before(async () => stub(Model, 'findOneAndUpdate').resolves(updatedbike));
    after(() => (Model.findOneAndUpdate as SinonStub).restore());

    it('Retorna um objeto atualizado de uma moto correspondente ao id recebido', async () => {
      const res = await motorcycleModel.update('15vfgt8r52w5e49fgter4523', bike);
      expect(res).to.be.an('object')
        .to.have.own.property('category')
          .to.be.equal('Street');
      expect(res).to.have.own.property('color').to.be.equal('azul');
    });
  });

  describe('Verifica o funcionamento da função delete', () => {
    before(async () => stub(Model, 'findOneAndRemove').resolves(bike));
    after(() => (Model.findOneAndRemove as SinonStub).restore());

    it('Retorna um objeto da moto deletada correspondente ao id recebido', async () => {
      const res = await motorcycleModel.delete('15vfgt8r52w5e49fgter4523');
      expect(res).to.be.deep.equal(bike);
    })
  });
});
