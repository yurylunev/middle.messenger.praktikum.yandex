import AuthAPI from '../api/auth-api';
import {TSignup, TSignin, TUserInfo} from '../api/auth-api.d';
import {store} from '../store/store';

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
      console.log(e);
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

  public async getUserInfo(): Promise<TUserInfo> {
    let userInfo: TUserInfo = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      phone: '',
      avatar: '',
      display_name: '',
    };
    try {
      userInfo = await this.api.getUserInfo();
      store.dispatch({
        type: 'user/SET',
        payload: userInfo,
      });
    } catch (e) {
      throw new Error(e);
    }
    return userInfo;
  }
}

export default new AuthController();
