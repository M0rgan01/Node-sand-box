import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// mock need to be imported before app
import { mock } from './KeycloakMock.spec';
import { createServer } from '../app';

chai.use(chaiHttp);

describe('authentication tests', () => {
  after(() => {
    mock.restore();
  });

  it('public path should success without auth', async () => {
    // given
    const server = await createServer();

    // when
    const res = await chai.request(server).get('/todoAPI/public/info');

    expect(res.status).eql(200);
    expect(res.body).eql('Healthy');
  });

  it('private path should success with Authorization header', async () => {
    // given
    const server = await createServer();

    // when
    const res = await chai
      .request(server)
      .get('/todoAPI/todos')
      .set('Authorization', 'secret');

    expect(res.status).eql(200);
  });
});
