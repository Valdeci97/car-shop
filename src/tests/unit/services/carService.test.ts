import * as sinon from 'sinon';
import { expect } from 'chai';
import { Car } from '../../../interfaces/CarInterface';
import { CarDocument } from '../../../models/CarModel';
import service, { model } from './mocks';

const { assert } = sinon;

describe('Testando o service de carros', () => {
  const car: Car = {
    model: 'Fusca',
    year: 1984,
    color: 'Branco',
    status: true,
    buyValue: 14000,
    doorsQty: 2,
    seatsQty: 5,
  };

  describe('Verifica comportamento da função read', () => {
    before(async () => sinon.stub(model, 'read' ).resolves([car] as CarDocument[]));
    after(() => (model.read as sinon.SinonStub).restore());

    it('Retorna um array com todos os docuementos existentes no banco', async () => {
      const res = await service.read();
      assert.calledOnce((model.read as sinon.SinonStub));
      expect(res).to.be.an('array').to.have.length(1);
    });
  });

  describe('Verifica o funcionamento da função readOne', () => {
    before(async () => sinon.stub(model, 'readOne').resolves(car as CarDocument));
    after(() => (model.readOne as sinon.SinonStub).restore());

    it('Retorna um objeto com o carro correspondente ao id recebido', async () => {
      const res = await service.readOne('1');
      assert.calledOnce((model.readOne as sinon.SinonStub));
      assert.calledWithExactly((model.readOne as sinon.SinonStub), '1');
      expect(res).to.be.an('object').to.include.all.keys([
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

  describe('Verifica o funcionamento da função create', () => {
    before(async () => sinon.stub(model, 'create').resolves(car as CarDocument));
    after(() => (model.create as sinon.SinonStub).restore());

    it('Retorna um objeto com o documento do carro criado', async () => {
      const res = await service.create(car);
      assert.calledOnce((model.create as sinon.SinonStub));
      assert.calledWithExactly((model.create as sinon.SinonStub), car);
      expect(res).to.be.an('object');
    });

    it('Lança um erro quando recebe um objeto fora dos padrões', async () => {
      const res = await service.create({} as Car);
      expect(res).to.be.an('object').to.have.own.property('error');
    });
  });

  describe('Verifica o funcionamento da função update', () => {
    before(async () => sinon.stub(model, 'update').resolves(car as CarDocument));
    after(() => (model.update as sinon.SinonStub).restore());

    it('Retorna um objeto com o carro atualizado correspondente ao id recebido', async () => {
      const res = await service.update('1', car);
      assert.calledOnce((model.update as sinon.SinonStub));
      assert.calledWithExactly((model.update as sinon.SinonStub), '1', car);
      expect(res).to.be.an('object');
    });

    it('Lança um erro quando recebe um objeto fora dos padrões', async () => {
      const res = await service.update('1', {} as Car);
      expect(res).to.be.an('object').to.have.own.property('error');
    });
  });

  describe('Verifica o funcionamento da função delete', () => {
    before(async () => sinon.stub(model, 'delete').resolves(car as CarDocument));
    after(() => (model.delete as sinon.SinonStub).restore());

    it('Retorna um objeto do carro deletado correspondente ao id recebido', async () => {
      const res = await service.delete('1');
      assert.calledOnce((model.delete as sinon.SinonStub));
      assert.calledWithExactly((model.delete as sinon.SinonStub), '1');
      expect(res).to.be.an('object');
    });
  });
});
