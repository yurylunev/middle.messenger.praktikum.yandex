import ErrorPage from '../components/error-page/error-page';
import render from '../utils/renderDOM';

render(new ErrorPage({
  statusCode: 404,
  statusText: `Не нашлось такого`,
}), '#root');
