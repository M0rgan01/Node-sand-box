import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// mock need to be imported before app
import { mock } from './KeycloakMock.spec';
import app from '../app';

chai.use(chaiHttp);

describe('authentication tests', () => {
  after(() => {
    mock.restore();
  });

  it('public path should success without auth', (done) => {
    // when
    chai
      .request(app)
      .get('/todoAPI/public/info')
      .end((err, res) => {
        // then
        expect(res.status).eql(200);
        expect(res.body).eql('Healthy');
        done();
      });
  });

  it('private path should success with Authorization header', (done) => {
    // when
    chai
      .request(app)
      .get('/todoAPI/todos')
      .end((err, res) => {
        // then
        expect(res.status).eql(200);
        done();
      });
  });
});
