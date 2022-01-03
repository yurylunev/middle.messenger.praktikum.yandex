import HTTPTransport from '../utils/http-transport';

const authAPIInstance = new HTTPTransport('/auth', {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

class AuthAPI {
  public signup = (data: object) => authAPIInstance.post('/signup', {data});

  public signIn = (data: object) => authAPIInstance.post('/signin', {data});

  public getUserInfo = () => authAPIInstance.get('/user');

  public logout = () => authAPIInstance.post('/logout');
}

export default AuthAPI;
