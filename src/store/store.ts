import EventBus from '../utils/event-bus';

export interface Action {
  type: string;
  payload?: any;
}

type Reducer<S = any> = (state: S, action: Action) => S;

type Indexed = { [key: string]: any };

export class Store extends EventBus {
  private state: Indexed = {};
  private readonly reducer: Reducer;

  constructor(reducers: Indexed) {
    super();
    this.reducer = this.combineReducers(reducers);
    this.dispatch({type: '@@INIT'});
  }

  public dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    console.log(action);
    if (action.type === 'messages/ADD') {
      console.log('Emit: "messages:changed"');
      this.emit('messages:changed');
    }
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
