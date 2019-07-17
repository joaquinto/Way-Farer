import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';

chai.use(chaiHttp);

describe('Create Trip', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.client);
    userToken = res.body.data.token;
  });

  beforeEach(() => {
    request = chai.request(app);
  });

  it('should throw an error for missing bus id', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.missingBusId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty bus id', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.emptyBusId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing origin', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.missingOrigin);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty origin', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.emptyOrigin);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing destination', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.missingDestination);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty destination', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.emptyDestination);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing trip date', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.missingTripDate);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty trip date', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.emptyTripDate);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing fare', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.missingFare);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty fare', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.emptyFare);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty token', async () => {
    const res = await request
      .post('/api/v1/trips')
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return an error for invalid token', async () => {
    const res = await request
      .post('/api/v1/trips')
      .set('Token', 'jhdkdjkhyfifkhjdjhkdhkdh')
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return the trip object', async () => {
    const res = await request
      .post('/api/v1/trips')
      .set('Token', userToken)
      .send(data.createTrip);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
  });
});

describe('Get Trip', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.client);
    userToken = res.body.data.token;
  });

  beforeEach(() => {
    request = chai.request(app);
  });

  it('Should return an error for invalid token', async () => {
    const res = await request
      .get('/api/v1/trips')
      .set('Token', 'jhdkdjkhyfifkhjdjhkdhkdh')
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return an error for empty token', async () => {
    const res = await request
      .get('/api/v1/trips')
      .set('Token', '')
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return an error for unmatched destination', async () => {
    const res = await request
      .get('/api/v1/trips?destination=gtt123')
      .set('Token', userToken)
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return the trip array of object based on the destination', async () => {
    const res = await request
      .get('/api/v1/trips?destination=new york')
      .set('Token', userToken)
      .send(data.createTrip);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
  });

  it('Should return the trip array of object', async () => {
    const res = await request
      .get('/api/v1/trips')
      .set('Token', userToken)
      .send(data.createTrip);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'status');
    assert.property((res.body), 'data');
  });
});

describe('Cancel Trip', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.client);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should throw an error for usage of string', async () => {
    const res = await request
      .patch('/api/v1/trips/hfjfj')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for no data found', async () => {
    const res = await request
      .patch('/api/v1/trips/12')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for less than 1', async () => {
    const res = await request
      .patch('/api/v1/trips/0')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should return success', async () => {
    const res = await request
      .patch('/api/v1/trips/3')
      .set('Token', userToken);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'data');
  });
});

describe('Cancel Trip Contn 1', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.bookingSignIn);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return error for not authorized', async () => {
    const res = await request
      .patch('/api/v1/trips/1')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });
});
