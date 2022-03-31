import render from './renderDOM';
import {isEqual} from './helpers';
import SignInPage from '../pages/auth/signin';
import SignupPage from '../pages/auth/signup';
import MessengerPage from '../pages/messenger/messenger';
import SettingsPage from '../pages/settings/settings';
import ChangePasswordPage from '../pages/settings/change-password';
import EditProfilePage from '../pages/settings/edit-profile';

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
      console.log(`Leave`, this._block);
      console.log(`ROOT Element`);
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  get isSecure(): boolean {
    return this._props.isSecure;
  }

  get getInstance() {
    return this._block;
  }

  get pathname() {
    return this._pathname;
  }

  render() {
    console.count('Route render');
    if (!this._block) {
      console.log(`Create Instance`);
      this._block = new this._blockClass();
    } else {
      if (!this.getInstance?.element?.childNodes.length) {
        this._block._render();
      }
    }
    console.log('BEFORE RENDER Block', this._block);
    console.log('Block element children', this._block.element);
    render(this._block, this._props.rootQuery);
    console.log('AFTER RENDER Block', this._block);
    return;
  }
}

export default Route;
export {TBlockConstructor};
