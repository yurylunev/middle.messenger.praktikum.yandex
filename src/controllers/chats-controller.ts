import ChatsAPI from '../api/chats-api';
import Router from '../utils/router';

class ChatsController {
  public getChats() {
    new ChatsAPI().getUserInfo().then((response: Response) => {
      if (response!.status !== 200) {
        console.log(response);
      }
    }).catch((error) => {
      Router.go(`/`);
      console.log(error);
    });
  }
}

export default ChatsController;
