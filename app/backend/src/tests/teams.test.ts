import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/TeamsModel'
import { teamFindAllMock } from './mocks/teamsMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  it('Testando TeamModel retorno', async function() {
    sinon.stub(TeamModel, 'findAll').resolves(TeamModel.bulkBuild(teamFindAllMock));
    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.deep.equal(teamFindAllMock);
  });

  afterEach(function() {
    sinon.restore();
  });
  describe('GET /teams/:id', () => {
    it('Testando se retorna o time pelo ID', async function () {
      sinon.stub(TeamModel, 'findByPk').resolves(TeamModel.bulkBuild(teamFindAllMock)[0]);

      const chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.body).to.deep.equal(teamFindAllMock[0]);
    });

    it('Testando se retorna status 404, caso o id passado não seja encontrado', async function() {
      sinon.stub(TeamModel, 'findByPk').resolves();

      const chaiHttpResponse = await chai.request(app).get('/teams/4120');

      expect(chaiHttpResponse.status).to.be.equal(404);
    })
  });
});
