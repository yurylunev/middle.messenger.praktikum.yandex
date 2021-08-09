import {LoginWindow, InputField} from '../components/login-window.tmpl';
import render from "../utils/renderDOM";
import {checkInputField, getInputsData} from "../utils/handlers";

render(new LoginWindow({
    headerText: `Вход`,
    inputFields: [
        {
            name: `login`,
            label: `Логин`,
            errorMessage: `Неверный логин`,
            events: {
                click: (event: Event) => {
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
    noEntryButtonText: `Нет аккаунта`,
    events: {
        ".entry": {
            click: getInputsData
        },
        "input": {
            blur: checkInputField
        }
    }
}), `#root`);
