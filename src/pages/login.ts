import LoginWindow from '../components/login-window/login-window';
import InputField from "../components/input-field/input-field";
import {checkInputField, getInputsData} from "../utils/handlers";
import render from "../utils/renderDOM";

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
