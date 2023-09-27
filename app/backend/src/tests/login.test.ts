import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginModel from '../database/models/UsersModel';
import { loginMock } from './mocks/loginMock';
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  it.only('Testando loginModel', async function() {
    sinon.stub(LoginModel, "findOne").resolves(LoginModel.build(loginMock));
    sinon.stub(bcrypt, "compareSync").returns(true);

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      id: 1,
      email: "admin@admin.com",
      password: "secret"
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  })
  
  afterEach(function() {
    sinon.restore();
  });
});
