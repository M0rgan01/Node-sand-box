import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
// mock need to be imported before app
import { mock } from './KeycloakMock.spec';
import app from '../app';

chai.use(chaiHttp);

describe('authentication tests', () => {
  before((done) => {
    app.on('ready', () => {
      done();
    });
  });

  after(() => {
    mock.restore();
  });

  it('Get todos should return all database todos', (done) => {
    // when
    chai
      .request(app)
      .get('/todoAPI/todos')
      .set('Authorization', 'secret')
      .end((err, res) => {
        // then
        expect(res.status).eql(200);
        expect(res.body).to.have.lengthOf(5);
        done();
      });
  });
});
