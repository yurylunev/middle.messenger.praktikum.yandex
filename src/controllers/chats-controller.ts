import ChatsAPI from '../api/chats-api';
import {TChatsList} from '../api/chats-api.d';
import {store} from '../store';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  public async getChatList(): Promise<TChatsList> {
    let chatsList: TChatsList = store.getState().chatsList;
    if (chatsList instanceof Array) {
      return chatsList;
    }

    try {
      // @ts-ignore
      chatsList = await this.api.getChatsList();
      store.dispatch({
        type: 'chats/SET',
        payload: chatsList,
      });
    } catch (e) {
      console.error(e);
    }
    return chatsList;
  }

  public async createChat(title: string) {
    return await this.api.createChat(title);
  }

  public async sendMessage(msg: string) {
    console.log(msg);
    try {
      return this.api.sendMessage(msg);
    } catch (e) {
      console.error(e);
    }
    return false;
  }
}

export default new ChatsController();
