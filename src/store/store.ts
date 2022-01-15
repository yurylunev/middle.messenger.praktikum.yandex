import EventBus from '../utils/event-bus';

interface Action {
  type: string;
  payload?: any;
}

type Reducer<S = any> = (state: S, action: Action) => S;

type Indexed = { [key: string]: any };

class Store extends EventBus {
  private state: Indexed = {};
  private readonly reducer: Reducer;

  constructor(reducers: Indexed) {
    super();
    this.reducer = this.combineReducers(reducers);
    this.dispatch({type: '@@INIT'});
  }

  public dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.emit('Changed');
  }

  public getState() {
    return this.state;
  }

  private combineReducers(reducers: Indexed): Reducer {
    return (state: any, action: Action) => {
      const newState: Indexed = {};
      Object.entries(reducers).forEach(([key, reducer]) => {
        newState[key] = reducer(state[key], action);
      });
      return newState;
    };
  }
}

export const store = new Store({
  user: (state = null, action: Action) => {
    switch (action.type) {
      case 'user/SET':
        return action.payload;
      case 'user/DELETE':
        return null;
      default:
        return state;
    }
  },
});

(window as any).store = store;
