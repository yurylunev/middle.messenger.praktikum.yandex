import {TUserRequest, TUserProfile, TUserPassword} from './users-api.d';

import BaseAPI from './base-api';

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user', {
      withCredentials: true,
      headers: {'Content-Type': 'application/json'},
    });
  }

  public async searchUser(login: string) {
    return this.http.post('/search', {data: {login}});
  }

  updateUserProfile(userData: TUserRequest) {
    return this.update('/profile', {
      data: userData,
    });
  };

  changeUserPassword(passwordRequest: TUserPassword) {
    return this.update('/password', {
      data: passwordRequest,
    });
  };

  updateUserAvatar(avatar: FormData) {
    return this.update('/profile/avatar', {
      data: avatar,
      headers: {},
    });
  };

  getUserProfile(id: number) {
    return this.read(`/user/${id}`);
  };

  read(url: string): Promise<TUserProfile> {
    return this.http.get(url);
  };

  update(url: string, data: object): Promise<TUserProfile> {
    return this.http.put(url, data);
  };

  delete: undefined;
  create: undefined;
}

export default UsersAPI;
