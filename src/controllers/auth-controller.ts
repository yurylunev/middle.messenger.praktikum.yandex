import AuthAPI from '../api/auth-api';
import Router from '../utils/router';

class AuthController {
  public getUserInfo() {
    new AuthAPI().getUserInfo().then((response) => {
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(JSON.parse(response.response)));
        localStorage.setItem('userId', JSON.stringify(JSON.parse(response.response).id));
      } else {
        console.log(response.response);
      }
    }).catch((err) => {
      new Router().go(`/`);
      console.log(err);
    });
  }

  public signIn(data: JSON, link: string) {
    new AuthAPI().signIn(data).then(
        (response) => {
          console.log(response);
          new Router().go(link);
        },
    ).catch((error) => console.log(error));
  }

  public signup(data: JSON, link: string) {
    new AuthAPI().signup(data).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('userId', JSON.parse(response.response).id);
        new Router().go(link);
      } else {
        console.log(response.response);
      }
    }).catch((err) => console.log(err));
  }

  public logout() {
    new AuthAPI().logout().then((response) => {
      if (response.status === 200) {
        localStorage.setItem('userData', '');
        localStorage.setItem('userId', '');
      }
    }).catch((error) => console.log(error));
  }
}

export default AuthController;
