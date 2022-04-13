import Block from '../../utils/block';
import avatarTemplate from './avatar.tmpl';

class Avatar extends Block {
  constructor(props: { avatarUrl: string; name: string; noEdit?: boolean }) {
    let {avatarUrl} = props;
    avatarUrl = avatarUrl ?
      `https://ya-praktikum.tech/api/v2/resources${avatarUrl}` :
      '/static/images/icon-image-placeholder.svg';
    super({...props, avatarUrl});
  }

  render(): string {
    // @ts-ignore
    return this.props.noEdit ?
      avatarTemplate
          .split('\n').filter((line) => line.indexOf('input') === -1).join('\n') :
      avatarTemplate;
  }
}

export default Avatar;
