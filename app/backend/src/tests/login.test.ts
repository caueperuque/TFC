import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginModel from '../database/models/UsersModel';
import { loginMock } from './mocks/loginMock';
import * as bcrypt from 'bcryptjs';
import Token from '../entities/Token';
import generateToken from '../services/utils/generateToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  it('Testando loginModel', async function() {
    sinon.stub(LoginModel, "findOne").resolves(LoginModel.build(loginMock));
    sinon.stub(bcrypt, "compareSync").returns(true);

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      id: 1,
      email: "admin@admin.com",
      password: "secret"
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Testando se ao passar nada, retorna status 400', async function() {
    sinon.stub(LoginModel, 'findOne').resolves();

    const chaiHttpResponse = await chai.request(app).post('/login').send()
    
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'All fields must be filled'
    })
  });

  it('Testando se um login inválido, retorna status 401', async function() {
    sinon.stub(LoginModel, 'findOne').resolves();

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "caue@gmail.com",
      password: "teste",
    })
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'Invalid email or password'
    })
  });

  it('Testando se passar uma senha inválido, retorna status 401', async function() {
    sinon.stub(LoginModel, 'findOne').resolves(LoginModel.build(loginMock));
    sinon.stub(bcrypt, 'compareSync').returns(false);

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      id: 1,
      email: "admin@admin.com",
      password: "secretT"
    })
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'Invalid email or password'
    })
  });

  describe('GET /login/role', () => {
    it('Testa se retorna o cargo da pessoa corretamente',async function () {
      sinon.stub(LoginModel, 'findOne').resolves(LoginModel.build(loginMock));
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(Token.prototype, 'validateToken' ).returns({
        email: 'admin@admin.com',
        role: 'admin',
        username: 'admin',
      });

      const createdToken = generateToken({
        email: "admin@admin.com",
        role: "admin",
        username: "admin"
      })

      const chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', `Bearer ${createdToken}`);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({role: loginMock.role})
      
    })
  })
  
  afterEach(function() {
    sinon.restore();
  });
});
