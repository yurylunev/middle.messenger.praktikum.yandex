import {
  TChatsList,
  TChatData,
  TChatsError,
  TChatsFile,
  TChatsResponse,
  TChatsTokenList,
} from './chats-api.d';

import BaseAPI from './base-api';

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats', {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'},
    });
  }

  getChatsList() {
    return this.read('');
  }

  createChat(title: string) {
    return this.create('', {title});
  }

  deleteChat(chatId: number) {
    return this.delete('', {chatId});
  }

  sendMessage(msg: string) {
    console.log('ChatsAPI.sendMessage', msg);
    return true;
  }

  read(url: string): Promise<TChatsList | TChatsFile | TChatsError> {
    return this.http.get(url);
  };

  update(url: string, data: object): Promise<TChatData | TChatsError> {
    return this.http.put(url, data);
  };

  delete(url: string, data: object): Promise<TChatsResponse | TChatsError> {
    return this.http.delete(url, {data});
  };

  create(url: string, data: object):
    Promise<TChatsResponse | TChatData | TChatsTokenList | TChatsError> {
    return this.http.post(url, {data});
  };
}

export default ChatsAPI;
