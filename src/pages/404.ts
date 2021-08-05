import {ErrorPage} from '../js/errors.tmpl';
import render from "../utils/renderDOM";

render(new ErrorPage({
    statusCode: 404,
    statusText: `Не нашлось такого`,
}), "#root");
