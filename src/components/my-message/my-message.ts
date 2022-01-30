import Block from '../../utils/block';
import myMessageTemplate from './my-message.tmpl';

class MyMessage extends Block {
  constructor(props: object) {
    super(props);
  }

  render(): string {
    return myMessageTemplate;
  }
}

export default MyMessage;
