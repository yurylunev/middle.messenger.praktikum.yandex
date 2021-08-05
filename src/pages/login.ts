import {loginWindow, inputFields} from '../js/login-window.tmpl';
import render from "../utils/renderDOM";

render(new loginWindow({
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
    ].map((item) => new inputFields(item).element),
    entryButtonText: `Авторизоваться`,
    noEntryButtonText: `Нет аккаунта`
}), `#root`);
