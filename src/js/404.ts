import Templator from './templator';
import {errorPageTemplate} from './errors.tmpl';

const errorPage = new Templator(errorPageTemplate);

const context = {
    statusCode: 404,
    statusText: `Не нашлось такого`,
};

const root = document.querySelector(`#root`);
root.innerHTML = errorPage.compile(context);
