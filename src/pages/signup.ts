import Templator from '../utils/templator';
import {loginWindowTemplate, inputFieldsTemplate} from '../js/login-window.tmpl';

const loginWindow = new Templator(loginWindowTemplate);
const inputFields = new Templator(inputFieldsTemplate);

const context = {
    headerText: `Регистрация`,
    inputFields: [
        {
            name: `email`,
            label: `Почта`,
            errorMessage: `Неверный адрес электронной почты`
        },
        {
            name: `login`,
            label: `Логин`,
            errorMessage: `Имя уже занято`
        },
        {
            name: `first_name`,
            label: `Имя`,
            errorMessage: `Недопустимые символы`
        },
        {
            name: `second_name`,
            label: `Фамилия`,
            errorMessage: `Недопустимые символы`
        },
        {
            name: `password`,
            label: `Пароль`,
            errorMessage: `Неверный пароль`
        },
        {
            name: `phone`,
            label: `Телефон`,
            errorMessage: `Телефон указан неверно`
        },
        {
            name: `password`,
            label: `Пароль`,
            errorMessage: ``,
            type: `password`
        },
        {
            name: `confirm-password`,
            label: `Пароль (ещё раз)`,
            errorMessage: `Пароли не совпадают`,
            type: `password`
        }
    ].map(item => inputFields.compile(item)).join(``),
    entryButtonText: `Зарегистрироваться`,
    noEntryButtonText: `Войти`
};

const root = document.querySelector(`#root`);
root.innerHTML = loginWindow.compile(context);
