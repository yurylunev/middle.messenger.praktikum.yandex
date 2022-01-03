import ChatsAPI from '../api/chats-api';
import Router from '../utils/router';

class ChatsController {
  public getChats() {
    new ChatsAPI().getUserInfo().then((response) => {
      console.log(response);
      if (response.status === 200) {
      } else {
        console.log(response.response);
      }
    }).catch((error) => {
      new Router().go(`/`);
      console.log(error);
    });
  }
}

export default ChatsController;
