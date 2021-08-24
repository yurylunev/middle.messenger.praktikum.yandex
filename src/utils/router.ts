import Route from './route';
import {TBlockConstructor} from './route';

class Router {
  private static __instance: any;
  private routes: Route[];
  private history: History;
  private _currentRoute: undefined | Route;
  private readonly _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: TBlockConstructor, blockProps: object) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery, blockProps});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      if (event.currentTarget) {
        this._onRoute((<Window>event.currentTarget).location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    if (route) {
      route.render();
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
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
