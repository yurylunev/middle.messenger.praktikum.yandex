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
      console.log('CONNECT: CDM', stateToProps(store.getState()));
      store.on('store:changed', () => {
        console.log('store change');
        this.setProps({
          ...props,
          ...stateToProps(store.getState()),
        });
      });
    }
  };
}
