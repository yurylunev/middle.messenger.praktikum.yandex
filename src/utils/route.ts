import render from './renderDOM';
import LoginWindow from '../components/login-window/login-window';
import UserinfoPage from '../components/userinfo-page/userinfo-page';
import ChatsPage from '../components/chats-page/chats-page';
import {isEqual} from './helpers';

type TBlock = LoginWindow | UserinfoPage | ChatsPage;

type TBlockConstructor = {
  new(props: object): TBlock
}

class Route {
  private _pathname: string;

  private readonly _blockClass: TBlockConstructor;

  private _block: null | TBlock;
  private _props: {
    blockProps: object;
    rootQuery: string
  };

  constructor(pathname: string,
      view: TBlockConstructor,
      props: { rootQuery: string, blockProps: object }) {
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
      // this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  get getInstance() {
    return this._block;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props.blockProps);
      render(this._block, this._props.rootQuery);
      return;
    }
    this._block = new this._blockClass(this._props.blockProps);
    render(this._block, this._props.rootQuery);
  }
}

export default Route;
export {TBlockConstructor};
