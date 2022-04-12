import Block from '../../utils/block';
import avatarTemplate from './avatar.tmpl';

class Avatar extends Block {
  constructor(props: { avatarUrl: string; name: string }) {
    let {avatarUrl} = props;
    avatarUrl = avatarUrl ?
      `https://ya-praktikum.tech/api/v2/resources${avatarUrl}` :
      '/static/images/icon-image-placeholder.svg';
    super({...props, avatarUrl});
  }

  render(): string {
    return avatarTemplate;
  }
}

export default Avatar;
