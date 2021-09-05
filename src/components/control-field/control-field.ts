import Block from '../../utils/block';
import controlFieldTemplate from './control-field.tmpl';

class ControlField extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return controlFieldTemplate;
  }
}

export default ControlField;
