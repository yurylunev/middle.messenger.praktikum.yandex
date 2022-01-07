import Block from '../../utils/block';
import dateHeaderTemplate from './date-header.tmpl';

class DateHeader extends Block {
  constructor(props: object) {
    super(undefined, props);
  }

  render(): string {
    return dateHeaderTemplate;
  }
}

export default DateHeader;
