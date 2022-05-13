import user from './user';
import chats from './chats';
import {Store} from './store';
import Block from '../utils/Block';

export const store = new Store({
  user, chats,
});

export function connect(stateToProps: (state: any) => any, Component: typeof Block) {
  return class WithStore<P = any> extends Component {
    constructor(props: P) {
      super({...props, ...stateToProps(store.getState())});
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      store.on('store:changed', () => {
        this.setProps({
          ...props,
          ...stateToProps(store.getState()),
        });
      });
    }
  };
}
