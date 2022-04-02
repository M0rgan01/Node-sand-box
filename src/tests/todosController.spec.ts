import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// mock need to be imported before app
import { mock } from './KeycloakMock.spec';
import { createServer } from '../app';

chai.use(chaiHttp);

describe('todos controller tests', () => {
  after(() => {
    mock.restore();
  });

  it('Get todos should return all database todos', async () => {
    // given
    const server = await createServer();

    // when
    const res = await chai
      .request(server)
      .get('/todoAPI/todos')
      .set('Authorization', 'secret');

    expect(res.status).eql(200);
    expect(res.body).to.have.lengthOf(5);
  });
});
