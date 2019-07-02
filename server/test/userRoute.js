import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';

chai.use(chaiHttp);

describe('Sign Up', () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
  });

  it('should throw an error for missing firstname', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingFirstname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty firstname', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.emptySignUpFirstname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing lastname', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingLastname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty lastname', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.emptySignUpLastname);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing email', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingSignupEmail);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty email', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.emptysignUpemail);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing password', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.missingSignupPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty password', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.emptySignUpPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing uppercase password', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.uInvalidSignUpPassword1);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing lowercase password', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.lInvalidSignUpPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing digit password', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.dInvalidSignUpPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('should throw an error for less than 6 password length', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.ldInvalidSignUpPassword);
    assert.equal((res.body.status), 400);
    assert.property((res.body), 'error');
  });

  it('Should return the user object', async () => {
    const res = await request
      .post('/api/v1/auth/signup')
      .send(data.signUp);
    assert.equal((res.body.status), 201);
    assert.property((res.body), 'status');
    assert.property((res.body), 'message');
  });

  it('should return status 200', async () => {
    const res = await chai.request(app)
      .get('/');
    assert.equal((res.body.status), 200);
    assert.property((res.body), 'message');
    assert.equal((res.body.message), 'Welcome to WayFarer ...');
  });

  it('should return status 404', async () => {
    const res = await chai.request(app)
      .get('/homy');
    assert.equal((res.body.status), 404);
    assert.property((res.body), 'error');
    assert.equal((res.body.error), 'Page not found');
  });
});
