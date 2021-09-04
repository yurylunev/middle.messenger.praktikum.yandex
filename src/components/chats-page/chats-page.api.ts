import HTTPTransport from '../../utils/http-transport';
import BaseAPI from '../../utils/base-api';

const chatsAPI = new HTTPTransport(`/`);

class ChatAPI extends BaseAPI {
  create() {
    return chatsAPI.post('/', {});
  }

  request() {
    return chatsAPI.get('/full');
  }
}

export default ChatAPI;
