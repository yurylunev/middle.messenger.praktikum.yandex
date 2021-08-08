import {
    Avatar,
    ControlsButton,
    Inputs,
    UserinfoPage
} from '../components/userinfo.tmpl';
import render from "../utils/renderDOM";
import {getInputsData} from "../utils/handlers";

render(new UserinfoPage({
    headerText: `Иван`,
    avatar: new Avatar({avatarUrl: `icon-image-placeholder.svg`}).element,
    style: `editable`,
    inputs: [
        {
            name: `email`,
            label: `Почта`,
            value: `pochta@yandex.ru`
        },
        {
            name: `login`,
            label: `Логин`,
            value: `ivanivanov`
        },
        {
            name: `first_name`,
            label: `Имя`,
            value: `Иван`
        },
        {
            name: `second_name`,
            label: `Фамилия`,
            value: `Иванов`
        },
        {
            name: `display_name`,
            label: `Имя в чате`,
            value: `Иван`
        },
        {
            name: `phone`,
            label: `Телефон`,
            value: `+7 (909) 967 30 30`
        }
    ].map(item => new Inputs(item).element),
    controls: [
        {
            label: `Сохранить`,
            style: `yellow-button`,
        },
        {
            label: `Отмена`,
            style: `transparent-button`,
        }
    ].map((item) => new ControlsButton(item).element),
    events: {
        ".yellow-button": {
            click: getInputsData
        }
    }
}), `#root`);
