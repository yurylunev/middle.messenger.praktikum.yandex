import LoginWindow from '../components/login-window/login-window';
import InputField from "../components/input-field/input-field";
import {checkInputField, getInputsData} from "../utils/handlers";
import render from "../utils/renderDOM";

render(new LoginWindow({
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
            name: `phone`,
            label: `Телефон`,
            errorMessage: `Телефон указан неверно`
        },
        {
            name: `password`,
            label: `Пароль`,
            errorMessage: `Слишком короткий пароль`,
            type: `password`
        },
        {
            name: `confirm-password`,
            label: `Пароль (ещё раз)`,
            errorMessage: `Пароли не совпадают`,
            type: `password`
        }
    ].map(item => new InputField(item).element),
    entryButtonText: `Зарегистрироваться`,
    noEntryButtonText: `Войти`,
    events: {
        ".entry": {
            click: getInputsData
        },
        "input": {
            blur: checkInputField
        }
    }
}), `#root`);
