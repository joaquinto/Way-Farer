import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';


chai.use(chaiHttp);

describe('Create Booking', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.specialSignIn);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should throw an error for missing trip id', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.missingTripId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing seat number', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.missingSeatNumber);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty trip id', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.emptyTripId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty seat number', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.emptySeatNumber);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid trip id', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.invalidTipId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid seat number', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.invalidSeatNumber);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty token', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .send(data.booking);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return an error for invalid token', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', 'jhdkdjkhyfifkhjdjhkdhkdh')
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });
});

describe('Create Booking misc', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.draftBookingSignIn);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return an array of object for the user bookings', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Token', userToken)
      .send(data.missingSeatNumber);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'data');
  });
});

describe('View Booking', () => {
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

  it('should throw an error for empty token', async () => {
    const res = await request
      .get('/api/v1/bookings');
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return an error for invalid token', async () => {
    const res = await request
      .get('/api/v1/bookings')
      .set('Token', 'jhdkdjkhyfifkhjdjhkdhkdh');
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should return an error for no data found', async () => {
    const res = await request
      .get('/api/v1/bookings')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });
});


describe('View Booking misc', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.specialSignIn);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return an array of object for the user bookings', async () => {
    const res = await request
      .get('/api/v1/bookings')
      .set('Token', userToken);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'data');
  });
});

describe('View all Booking', () => {
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

  it('should return an array of object for the user bookings', async () => {
    const res = await request
      .get('/api/v1/bookings')
      .set('Token', userToken);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'data');
  });
});

describe('Delete Booking', () => {
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
      .delete('/api/v1/bookings/hfjfj')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for no data found', async () => {
    const res = await request
      .delete('/api/v1/bookings/12')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for less than 1', async () => {
    const res = await request
      .delete('/api/v1/bookings/0')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for not a user', async () => {
    const res = await request
      .delete('/api/v1/bookings/1')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });
});

describe('Delete Booking Contn', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.specialSignIn);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return success', async () => {
    const res = await request
      .delete('/api/v1/bookings/1')
      .set('Token', userToken);
    assert.equal((res.body.status), 'success');
    assert.property((res.body), 'data');
  });
});

describe('Delete Booking Contn 1', () => {
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
      .delete('/api/v1/bookings/1')
      .set('Token', userToken);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });
});
