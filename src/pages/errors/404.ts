import Block from '../../utils/block';
import {withRouter} from '../../utils/router';
import './errors.pcss';
import {connect} from '../../store';

class ErrorPage404 extends Block {
  constructor() {
    super({
      statusCode: 404,
      statusText: `Не нашлось такого`,
      events: {
        '.back-text': {
          // click: () => Router.go('/messenger'),
        },
      },
    });
  }

  // componentDidMount(props?: any) {
  //   // console.log(this.props.router, props);
  // }

  render(): string {
    return `
<div class="error">
    <div class="status-code-{{statusCode}}">{{statusCode}}</div>
    <div class="status-text">{{statusText}}</div>
    <button class="back-text">Назад к чатам</button>
</div>`;
  }
}

export default withRouter(connect((state) => ({
  user: state.user.profile,
}), ErrorPage404));
export {ErrorPage404};
