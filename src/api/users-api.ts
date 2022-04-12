import {TUserRequest, TUserProfile, TUserPassword} from './users-api.d';

import BaseAPI from './base-api';

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user', {
      withCredentials: true,
    });
  }

  updateUserProfile(userData: TUserRequest) {
    return this.update('/profile', {
      data: userData,
      headers: {'Content-Type': 'application/json'},
    });
  };

  changeUserPassword(passwordRequest: TUserPassword) {
    return this.update('/password', {
      data: passwordRequest,
      headers: {'Content-Type': 'application/json'},
    });
  };

  updateUserAvatar(avatar: FormData) {
    // jQuery.ajax({
    //   url: `https://ya-praktikum.tech/api/v2/user/profile/avatar`,
    //   type: `PUT`,
    //   data: avatar,
    //   success: function(d: any) {
    //     console.log(d);
    //   },
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   xhrFields: {
    //     withCredentials: true,
    //   },
    // });

    return this.update('/profile/avatar', {
      data: avatar,
      headers: {
        'Content-Type': `multipart/form-data; boundary=AJAX--------------${(new Date).getTime()}`,
      },
    });
  };

  getUserProfile(id: number) {
    return this.read(`/user/${id}`);
  };

  read(url: string): Promise<TUserProfile> {
    return this.http.get(url);
  };

  update(url:string, data: object): Promise<TUserProfile> {
    console.log(111, data);
    return this.http.put(url, data);
  };

  delete: undefined;
  create: undefined;
}

export default UsersAPI;
