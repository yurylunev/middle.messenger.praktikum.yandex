import user from './user';
import chats from './chats';
import {Store} from './store';
import Block from '../utils/block';
import {BlockProps} from '../utils/block.d';

export const store = new Store({
  user, chats,
});

export function connect(stateToProps: (state: any) => any, Component: typeof Block): typeof Block {
  return class WithStore extends Component {
    constructor(props: BlockProps) {
      super({...props, ...stateToProps(store.getState())});
    }

    componentDidMount(props: BlockProps) {
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
