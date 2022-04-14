import ChatsAPI from '../api/chats-api';
import {TChatsList} from '../api/chats-api.d';
import {store} from '../store';
import {setChatsList, setCurrentChat} from '../store/chats';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
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
    await this.getCurrentChat();
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
      store.dispatch(setChatsList(chatsList));
    } catch (e) {
      console.error(e);
    }
    return chatsList;
  }

  public async getCurrentChat() {
    store.dispatch(setCurrentChat(store.getState().chats.chatsList[0]));
    return true;
  }

  public async createChat(title: string) {
    return await this.api.createChat(title);
  }

  public async deleteChat() {
    const chatsList: TChatsList = store.getState().chats.chatsList;
    console.log(store);
    if (chatsList instanceof Array && chatsList.length) {
      try {
        await this.api.deleteChat(chatsList[0].id);
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
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
