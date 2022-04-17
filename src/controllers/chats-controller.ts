import ChatsAPI from '../api/chats-api';
import {TChatsList} from '../api/chats-api.d';
import {store} from '../store';
import {addMessages, setChatsList, setCurrentChat} from '../store/chats';
import UsersAPI from '../api/users-api';

class ChatsController {
  private api: ChatsAPI;
  private userAPI: UsersAPI;
  private socket: any;

  constructor() {
    this.api = new ChatsAPI();
    this.userAPI = new UsersAPI();
  }

  private loadMessages = async () => {
    if (this.socket) {

    }
    // store.dispatch(addMessages(messages));
  };

  private async initSocket(socketURL: string) {
    this.socket = await new WebSocket(socketURL);

    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({content: '0', type: 'get old'}));
    });

    this.socket.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      if (data instanceof Array) {
        store.dispatch(addMessages(data, store.getState().user.profile.id));
      }
      if (data.type === 'message') {
        store.dispatch(addMessages([data], store.getState().user.profile.id));
      }
    });

    this.socket.addEventListener('error', (event: any) => {
      console.log('Ошибка', event.message);
    });

    setInterval(() => {
      this.socket.send(JSON.stringify({
        type: 'ping',
      }));
    }, 20000);
  }

  public async init() {
    await this.getChatList();
    return store.getState().chats;
  }

  public async getChatList(): Promise<TChatsList> {
    let chatsList: TChatsList = store.getState().chats;
    if (chatsList instanceof Array) {
      return chatsList;
    }
    try {
      // @ts-ignore
      chatsList = await this.api.getChatsList();
      for (const chat of chatsList) {
        chat.users = await this.api.getChatUsers(chat.id);
      }

      store.dispatch(setChatsList(chatsList));
    } catch (e) {
      console.error(e);
    }
    return chatsList;
  }

  public async setCurrentChat(chatId: number) {
    const selectedChat = store.getState().chats.chatsList
        .find((chat: { id: number }) => chat.id === +chatId);
    store.dispatch(setCurrentChat(selectedChat));
    const tokenValue = await this.api.getChatToken(selectedChat.id);
    const userId = store.getState().user.profile.id;

    this.initSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenValue}`)
        .then(() => this.loadMessages());

    return true;
  }

  private static getChatUsers() {
    const currentChat = store.getState().chats.currentChat;
    const chatId = currentChat.id;
    const users = currentChat.users.map((user: { id: number }) => user.id);
    return {chatId, users};
  }

  public async addUserToChat(username: string) {
    const foundUsers = await this.userAPI.searchUser(username);
    if (foundUsers instanceof Array && foundUsers.length) {
      const {chatId, users} = ChatsController.getChatUsers();
      users.push(foundUsers[0].id);
      return await this.api.addUserToChat({chatId, users});
    }
  }

  public async deleteUserFromChat(userId: number) {
    const chatId: number = store.getState().chats.currentChat.id;
    return await this.api.deleteUsersFromChat({chatId, users: [+userId]});
  }

  public async createChat(title: string) {
    return await this.api.createChat(title);
  }

  public async deleteChat() {
    const chatId = store.getState().chats.currentChat?.id;
    if (chatId) {
      try {
        return await this.api.deleteChat(chatId);
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }

  public async sendMessage(msg: string) {
    this.socket.send(JSON.stringify({
      content: msg,
      type: 'message',
    }));
  }
}

export default new ChatsController();
