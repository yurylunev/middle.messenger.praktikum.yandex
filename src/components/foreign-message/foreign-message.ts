import Block from '../../utils/block';
import foreignMessageTemplate from './foreign-message.tmpl';

class ForeignMessage extends Block {
  constructor(props: object) {
    super(props);
  }

  render(): string {
    return foreignMessageTemplate;
  }
}

export default ForeignMessage;
