import AuthAPI from '../api/auth-api';
import {TSignup, TSignin, TUserInfo} from '../api/auth-api.d';
import {store} from '../store';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  public async signup(data: TSignup) {
    try {
      await this.api.signup(data);
      await this.getUserInfo();
    } catch (e) {
      console.log(e);
    }
  }

  public async signin(data: TSignin) {
    try {
      await this.api.signin(data);
      await this.getUserInfo();
    } catch (e) {
      throw e;
    }
  }

  public async logout() {
    try {
      await this.api.logout();
      store.dispatch({
        type: 'user/DELETE',
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async checkAuth(): Promise<boolean> {
    try {
      store.dispatch({
        type: 'user/SET',
        payload: await this.getUserInfo(),
      });
    } catch (e) {
      store.dispatch({
        type: 'user/SET_ERROR',
        payload: e,
      });
      return false;
    }

    return true;
  }

  public async getUserInfo(): Promise<TUserInfo> {
    let userInfo: TUserInfo = store.getState().user.profile;
    if (!userInfo) {
      try {
        userInfo = await this.api.getUserInfo();
        store.dispatch({
          type: 'user/SET',
          payload: userInfo,
        });
      } catch (e) {
        store.dispatch({
          type: 'user/SET_ERROR',
          payload: e,
        });
      }
    }
    return userInfo;
  }
}

export default new AuthController();
