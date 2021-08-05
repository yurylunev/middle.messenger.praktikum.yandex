import {ErrorPage} from '../components/errors.tmpl';
import render from "../utils/renderDOM";

render(new ErrorPage({
    statusCode: 500,
    statusText: `Капец какой-то на сервере`,
}), "#root");
