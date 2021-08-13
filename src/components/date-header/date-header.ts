import Block from '../../utils/block';

class DateHeader extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return `
<div class="message">
    <div class="date">
        {{date}}
    </div>
</div>
`;
  }
}

export default DateHeader;
