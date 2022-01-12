import {TSignin, TSignup, TUserInfo} from './auth-api.d';

import BaseAPI from './base-api';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth', {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    });
  }

  getUserInfo(): Promise<TUserInfo> {
    return this.http.get('/user');
  }

  signup(data: TSignup): Promise<{ id: number }> {
    return this.http.post('/signup', {data});
  }

  signin(data: TSignin): Promise<void> {
    return this.http.post('/signin', {data});
  }

  logout(): Promise<void> {
    return this.http.post('/logout');
  }

  read: undefined;
  delete: undefined;
  create: undefined;
  update: undefined;
}

export default AuthAPI;
