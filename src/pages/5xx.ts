import ErrorPage from '../components/error-page/error-page';
import render from '../utils/renderDOM';

render(new ErrorPage({
  statusCode: 500,
  statusText: `Капец какой-то на сервере`,
}), '#root');
