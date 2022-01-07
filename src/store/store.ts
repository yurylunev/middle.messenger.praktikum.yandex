import EventBus from '../utils/event-bus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    // TODO Refactor this later
    function set(state: { [x: string]: any; }, path: string, value: unknown) {
      state[path] = value;
    }

    set(this.state, path, value);
    console.log('Store');
    this.emit(StoreEvents.Updated);
  };
}

export default new Store();
