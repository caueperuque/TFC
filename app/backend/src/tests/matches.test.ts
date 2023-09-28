import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import MatchesModel from '../database/models/MatchesModel';
import { allMatchesMock, matchesInProgressMock } from './mocks/matchesMock';
import generateToken from '../services/utils/generateToken';
import middleware from '../middlewares/auth.middleware'
import Token from '../entities/Token';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  it('Testando MatchesModel retorno', async function() {
    sinon.stub(MatchesModel, 'findAll').resolves(MatchesModel.bulkBuild(allMatchesMock));
    const chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body).to.deep.equal(allMatchesMock);
  });

  describe('GET /matches?Inprogress', () => {
    it('Testando retorno das partidas em andamento', async function () {
      sinon.stub(MatchesModel, 'findOne').resolves(MatchesModel.bulkBuild(matchesInProgressMock)[0]);
      const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
      
      expect(chaiHttpResponse.status).to.be.equal(200);
    })
  })

  describe('PATCH /matches/:id/finish', () => {
    it('Testando o retorno da requisição', async function() {
      sinon.stub(MatchesModel, 'findOne').resolves(MatchesModel.build(allMatchesMock[0]))
      sinon.stub(MatchesModel, 'update').resolves([1] as any);
      sinon.stub(Token.prototype, 'validateToken' ).returns({
        email: 'admin@admin.com',
        role: 'admin',
        username: 'string',
      })

      const createdToken = generateToken({
        email: "admin@admin.com",
        role: "admin",
        username: "ADMIN"
      });     


      const chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${createdToken}`);

      expect(chaiHttpResponse.status).to.be.equal(200)
    });

    describe('PATCH /match/:id', () => {
      it('Testando se retorna o status correto', async function() {
        sinon.stub(MatchesModel, 'findOne').resolves(MatchesModel.build(allMatchesMock[0]));
        sinon.stub(MatchesModel, 'update').resolves([1] as any);
        sinon.stub(Token.prototype, 'validateToken' ).returns({
          email: 'admin@admin.com',
          role: 'admin',
          username: 'string',
        })
  
        const createdToken = generateToken({
          email: "admin@admin.com",
          role: "admin",
          username: "ADMIN"
        });

        const chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .set('authorization', `Bearer ${createdToken}`)
          .send({ homeTeamGoals: 10, awayTeamGoals: 0 });

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match 1 update for home team: 10 x away team: 0' })
      })
    })
  })

  afterEach(function() {
    sinon.restore();
  });
  
});
