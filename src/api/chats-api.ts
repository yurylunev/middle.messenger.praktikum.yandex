import HTTPTransport from '../utils/http-transport';

const chatsAPIInstance = new HTTPTransport('/chats', {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

class ChatsAPI {
  public signup = (data: object) => chatsAPIInstance.post('/signup', {data});

  public signIn = (data: object) => chatsAPIInstance.post('/signin', {data});

  public getUserInfo = () => chatsAPIInstance.get('/user');

  public logout = () => chatsAPIInstance.post('/logout');
}

export default ChatsAPI;
