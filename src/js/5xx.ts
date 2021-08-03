import Templator from './templator';
import {errorPageTemplate} from './errors.tmpl';

const errorPage = new Templator(errorPageTemplate);

const context = {
    statusCode: 500,
    statusText: `Капец какой-то на сервере`,
};

const root = document.querySelector(`#root`);
root.innerHTML = errorPage.compile(context);
