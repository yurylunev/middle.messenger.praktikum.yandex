import render from './renderDOM';
import {isEqual} from './helpers';
import SignInPage from '../pages/auth/signin';
import SignupPage from '../pages/auth/signup';
import {MessengerPage} from '../pages/messenger/messenger';
import SettingsPage from '../pages/settings/settings';
import ChangePasswordPage from '../pages/settings/change-password';
import {EditProfilePage} from '../pages/settings/edit-profile';

export type TBlock = SignInPage |
  SignupPage |
  MessengerPage |
  SettingsPage |
  ChangePasswordPage |
  EditProfilePage;

type TBlockConstructor = {
  new(): TBlock
}

class Route {
  private _pathname: string;

  private readonly _blockClass: TBlockConstructor;

  private _block: null | TBlock;
  private _props: {
    rootQuery: string;
    isSecure: boolean;
  };

  constructor(pathname: string,
      view: TBlockConstructor,
      props: { rootQuery: string; isSecure: boolean }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  get isSecure(): boolean {
    return this._props.isSecure;
  }

  createInstance() {
    this._block = new this._blockClass();
  }

  get Instance() {
    return this._block;
  }

  get pathname() {
    return this._pathname;
  }

  render() {
    if (!this._block) {
      this.createInstance();
    } else {
      this._block._render();
    }
    render(this._block, this._props.rootQuery);
    return;
  }
}

export default Route;
export {TBlockConstructor};
