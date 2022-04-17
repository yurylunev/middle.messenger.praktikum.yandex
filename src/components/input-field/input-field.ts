import Block from '../../utils/block';
import inputFieldTemplate from './input-field.tmpl';
import Inputs from '../inputs/inputs';

class InputField extends Block {
  constructor(props: { errorMessage?: string }) {
    super({
      inputs: new Inputs(props).getContent(),
      errorMessage: props.errorMessage,
    });
  }

  render() {
    // @ts-ignore
    return this.props.errorMessage ?
      inputFieldTemplate :
      inputFieldTemplate
          .split('\n').filter((line) => line.indexOf('error-message') === -1).join('\n');
  }
}

export default InputField;
