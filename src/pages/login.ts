import {LoginWindow, InputField} from '../components/login-window.tmpl';
import render from "../utils/renderDOM";

render(new LoginWindow({
    headerText: `Вход`,
    inputFields: [
        {
            name: `login`,
            label: `Логин`,
            errorMessage: `Неверный логин`,
            events: {
                click: (event) => {
                    console.log(event)
                }
            }
        },
        {
            name: `password`,
            label: `Пароль`,
            errorMessage: `Неверный пароль`,
            type: `password`
        }
    ].map((item) => new InputField(item).element),
    entryButtonText: `Авторизоваться`,
    noEntryButtonText: `Нет аккаунта`
}), `#root`);
