import Block from '../../utils/block';
import foreignImageTemplate from './foreign-image.tmpl';

class ForeignImage extends Block {
  constructor(props: object) {
    super(props);
  }

  render(): string {
    return foreignImageTemplate;
  }
}

export default ForeignImage;
