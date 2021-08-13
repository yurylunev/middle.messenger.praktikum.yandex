import Block from '../../utils/block';

class InputField extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return `
<div class="login-window_input-field">
        <div class="input-field">
            <label for="{{name}}">{{label}}</label>
            <input type="{{type}}" placeholder="{{label}}" id="{{name}}" name="{{name}}"/>
        </div>
        <div class="error-message hidden">{{errorMessage}}</div>
</div>`;
  }
}

export default InputField;
