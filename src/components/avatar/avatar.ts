import Block from '../../utils/block';

class Avatar extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return `
<div class="avatar-wrapper">
    <label for="{{name}}">
        <img src="/static/images/{{avatarUrl}}">
    </label>
    <input type="file" id="{{name}}" name="{{name}}" class="invisible position-absolute">
</div>
`;
  }
}

export default Avatar;
