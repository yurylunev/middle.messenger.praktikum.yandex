import Block from '../../utils/block';

class MyMessage extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return `
<div class="message">
    <div class="my-message">
        <div>{{textMessage}}</div>
        <div class="time">
            <img src=/static/images/msg-status-{{statusMessage}}.svg">
            {{timeMessage}}
        </div>
    </div>
</div>
`;
  }
}

export default MyMessage;
