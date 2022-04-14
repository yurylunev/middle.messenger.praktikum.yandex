import UsersAPI from '../api/users-api';
import {TUserRequest, TUserPassword, TUserProfile} from '../api/users-api.d';
import {store} from '../store';

class UsersController {
  private api: UsersAPI;

  constructor() {
    this.api = new UsersAPI();
  }

  public async getUserProfile(id: number): Promise<TUserProfile | undefined> {
    let userProfile;
    try {
      userProfile = await this.api.getUserProfile(id);
    } catch (e) {
      console.error(e);
    }
    return userProfile;
  }

  public async updateUserAvatar(avatar: FormData) {
    try {
      return await this.api.updateUserAvatar(avatar);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async updateUserProfile(userRequest: TUserRequest) {
    try {
      const userProfile = await this.api.updateUserProfile(userRequest);
      if (userProfile) {
        store.dispatch({
          type: 'user/SET',
          payload: userProfile,
        });
      }
      return userProfile;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  public async changeUserPassword(passwordRequest: TUserPassword) {
    try {
      await this.api.changeUserPassword(passwordRequest);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UsersController();
