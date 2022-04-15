import ChatsAPI from '../api/chats-api';
import {TChatsList} from '../api/chats-api.d';
import {store} from '../store';
import {setChatsList, setCurrentChat} from '../store/chats';
import UsersAPI from '../api/users-api';

class ChatsController {
  private api: ChatsAPI;
  private userAPI: UsersAPI;

  constructor() {
    this.api = new ChatsAPI();
    this.userAPI = new UsersAPI();
  }

  private mockMessages = () => {
    store.dispatch({
      type: 'messages/SET', payload: [
        {
          messageType: `dateHeader`,
          date: `20 июля 2022`,
        },
        {
          messageType: `foreignMessage`,
          textMessage: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории
          — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на
          Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря,
          все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой
          забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса,
          но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено
          25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
          timeMessage: `11:00`,
        },
        {
          messageType: `foreignImage`,
          imageURL: `image.png`,
          timeMessage: `11:00`,
        },
        {
          messageType: `myMessage`,
          textMessage: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории —
      НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.
      Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки
      этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали
      только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло
      не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну
      из них недавно продали на аукционе за 45000 евро.`,
          timeMessage: `11:00`,
          statusMessage: `read`,
        },
      ],
    });
  };

  public async init() {
    await this.getChatList();
    this.mockMessages();
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
    return true;
  }

  private getChatUsers() {
    const currentChat = store.getState().chats.currentChat;
    const chatId = currentChat.id;
    const users = currentChat.users.map((user: { id: number }) => user.id);
    return {chatId, users};
  }

  public async addUserToChat(username: string) {
    const foundUsers = await this.userAPI.searchUser(username);
    if (foundUsers instanceof Array && foundUsers.length) {
      const {chatId, users} = this.getChatUsers();
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
