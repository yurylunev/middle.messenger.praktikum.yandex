import Block from '../../utils/block';
import infoFieldTemplate from './info-field.tmpl';

class InfoField extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render() {
    return infoFieldTemplate;
  }
}

export default InfoField;
