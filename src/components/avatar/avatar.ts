import Block from '../../utils/block';
import avatarTemplate from './avatar.tmpl';

class Avatar extends Block {
  constructor(props: object) {
    super(props);
  }

  render(): string {
    return avatarTemplate;
  }
}

export default Avatar;
