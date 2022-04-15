import {
  TChatsList,
  TChatData,
  TChatsError,
  TChatsResponse,
  TChatsTokenList,
  TChatsUser,
} from './chats-api.d';

import BaseAPI from './base-api';

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats', {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'},
    });
  }

  async getChatsList(): Promise<TChatsList> {
    const chatsList = await this.read('');
    return (chatsList instanceof Array) ? chatsList : [];
  }

  public async getChatUsers(id: number): Promise<TChatsUser[]> {
    return await this.read(`/${id}/users`);
  }

  public async addUserToChat(data: {chatId: number, users: number[]}) {
    return await this.update('/users', {data});
  }

  public async deleteUsersFromChat(data: {chatId: number, users: number[]}) {
    console.log(data);
    return await this.delete('/users', data);
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

  read(url: string): Promise<any> {
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
