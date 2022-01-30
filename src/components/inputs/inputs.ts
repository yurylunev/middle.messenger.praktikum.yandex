import Block from '../../utils/block';
import inputFieldTemplate from './inputs.tmpl';

class Inputs extends Block {
  constructor(props: object) {
    super( props);
    this.props = props;
  }

  render() {
    const nullAttributes = ['type', 'name', 'label', 'value'].filter(
        (attr) => !this.props.hasOwnProperty(attr));
    const rule = new RegExp(`\\s\\w*="{{\\s*(${nullAttributes.join('|')})\\s*}}"`, 'ig');
    return (nullAttributes.length) ?
      inputFieldTemplate.replace(rule, '') :
      inputFieldTemplate;
  }
}

export default Inputs;
