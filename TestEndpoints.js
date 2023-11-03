const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./Server'); // assuming your server file is named server.js

chai.use(chaiHttp);
const expect = chai.expect;

chai.request(server)
  .get('/generate-token?user=john')
  .end((err, res) => {
    console.log(res.status); // Log the status code
    console.log(res.body);   // Log the response body
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

describe('Server API', () => {
  it('should generate a token for user "john"', (done) => {
    chai.request(server)
      .get('/generate-token?user=john')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

