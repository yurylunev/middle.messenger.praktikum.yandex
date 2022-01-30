import Block from '../../utils/block';
import chatTemplate from './chat.tmpl';

class Chat extends Block {
  constructor(props: object) {
    super(props);
  }

  render(): string {
    return chatTemplate;
  }
}

export default Chat;
