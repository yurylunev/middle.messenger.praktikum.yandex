// @ts-ignore
import chai, {assert, expect} from 'chai';
// @ts-ignore
import sinon from 'sinon';
// @ts-ignore
import sinonChai from 'sinon-chai';
import HTTPTransport from './http-transport';

chai.use(sinonChai);

let requests: any[] = [];

before(function() {
  requests = [];
  XMLHttpRequest = sinon.useFakeXMLHttpRequest();
  // @ts-ignore
  XMLHttpRequest.onCreate = function(xhr: any) {
    requests.push(xhr);
  };
});

after(function() {
  // @ts-ignore
  Promise.all().then(() => {
    // @ts-ignore

    requests = [];
  });
});

const http = new HTTPTransport('/auth', {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

describe('HTTP-Transport tests:', function() {
  it('Should set headers', function() {
    http.get('');
    expect(requests.length).to.equal(2);
    expect(requests[1].method).to.equal('GET');
    expect(requests[1].withCredentials).to.equal(true);
  });

  it('Should send data', function() {
    const data = {username: 'John Doe'};
    http.post('', {data});
    expect(requests.length).to.equal(3);
    expect(requests[2].method).to.equal('POST');
    expect(requests[2].requestBody).to.equal(JSON.stringify(data));
  });

  it('Should use PUT method', function() {
    const data = {id: 123};
    http.put('', {data});
    expect(requests.length).to.equal(4);
    expect(requests[3].method).to.equal('PUT');
    expect(requests[3].requestBody).to.equal(JSON.stringify(data));
  });
});
