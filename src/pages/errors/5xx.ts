import Block from '../../utils/block';
import Router from '../../utils/router';
import './errors.pcss';

class ErrorPage500 extends Block {
  constructor() {
    super({
      statusCode: 500,
      statusText: `Капец какой-то на сервере`,
      events: {
        '.back-text': {
          click: () => Router.go('/messenger'),
        },
      },
    });
  }

  render(): string {
    return `
<div class="error">
    <div class="status-code-{{statusCode}}">{{statusCode}}</div>
    <div class="status-text">{{statusText}}</div>
    <button class="back-text">Назад к чатам</button>
</div>
`;
  }
}

export default ErrorPage500;
