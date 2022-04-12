import user from './user';
import {Store} from './store';
import Block from '../utils/Block';


export const store = new Store({
  user,
});


export function connect(stateToProps: (state: any) => any, Component: typeof Block) {
  return class WithStore extends Component {
    constructor(props: any) {
      super({...props, ...stateToProps(store.getState())});
    }

    componentDidMount(props: any) {
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

// @ts-ignore
// window['store'] = store;
