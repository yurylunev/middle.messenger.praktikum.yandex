import Block from '../../utils/block';
import inputFieldTemplate from './input-field.tmpl';
import Inputs from '../inputs/inputs';

class InputField extends Block {
  constructor(props: { errorMessage?: string }) {
    super(undefined, {
      inputs: new Inputs(props).getContent(),
      errorMessage: props.errorMessage,
    });
  }

  render() {
    return inputFieldTemplate;
  }
}

export default InputField;
