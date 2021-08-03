import Templator from './templator';
import {loginWindowTemplate, inputFieldsTemplate} from './login-window.tmpl';

const loginWindow = new Templator(loginWindowTemplate);
const inputFields = new Templator(inputFieldsTemplate);

const context = {
    headerText: `Вход`,
    inputFields: [
        {
            name: `login`,
            label: `Логин`,
            errorMessage: `Неверный логин`
        },
        {
            name: `password`,
            label: `Пароль`,
            errorMessage: `Неверный пароль`,
            type: `password`
        }
    ].map(item => inputFields.compile(item)).join(``),
    entryButtonText: `Авторизоваться`,
    noEntryButtonText: `Нет аккаунта`
};

const root = document.querySelector(`#root`);
root.innerHTML = loginWindow.compile(context);
