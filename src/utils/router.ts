import Route from './route';
import {TBlockConstructor} from './route';
import AuthController from '../controllers/auth-controller';
import {store} from '../store/store';

class Router {
  private routes: Route[];
  private history: History;
  private _currentRoute: undefined | Route;
  private readonly _rootQuery: string;

  constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;
    this._rootQuery = rootQuery;
  }

  use(pathname: string, block: TBlockConstructor, isSecure = true) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery, isSecure});
    this.routes.push(route);
    return this;
  }

  async checkAuth() {
    await AuthController.checkAuth();
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      if (event.currentTarget) {
        this._onRoute((<Window>event.currentTarget).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
    return this;
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    if (route) {
      route.render();
    } else {
      if (store.getState().user.isAuthorized) {
        if (pathname === '/' || pathname === '/sign-up') {
          window.location.pathname = '/messenger';
        } else {
          window.location.pathname = '/404';
        }
      } else {
        window.location.pathname = '/';
      }
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname) &&
      store.getState().user.isAuthorized === route.isSecure);
  }
}

export default new Router();
