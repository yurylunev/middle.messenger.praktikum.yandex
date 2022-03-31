import Route from './route';
import {store} from '../store';
import Block from './block';

class Router {
  private static __instance: Router;
  private readonly routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private readonly _rootQuery = '#root';

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, isSecure = true) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery, isSecure});
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

  get currentPage() {
    return this.getRoute(this._currentRoute?.pathname || '');
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname) &&
      store.getState().user.isAuthorized === route.isSecure) || null;
  }
}

export default new Router();

export function withRouter(Component: typeof Block) {
  return class WithRouter extends Component {
    constructor(props: any) {
      const router = new Router();

      super({...props, router});
    }
  };
}
