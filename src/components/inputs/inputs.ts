import Block from '../../utils/block';

class Inputs extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return `
<div class="input-field">
    <label for="{{name}}">{{label}}</label>
    <input type="{{type}}" id="{{name}}" name="{{name}}" value="{{value}}">
</div>
`;
  }
}

export default Inputs;
