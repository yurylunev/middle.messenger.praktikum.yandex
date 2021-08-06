import {ControlsButton, Inputs, UserinfoPage} from '../components/userinfo.tmpl';
import render from "../utils/renderDOM";

render(new UserinfoPage({
    headerText: `Сменить пароль`,
    avatarUrl: `icon-image-placeholder.svg`,
    style: `editable`,
    inputs: [
        {
            name: `oldPassword`,
            label: `Старый пароль`,
            type: `password`
        },
        {
            name: `newPassword`,
            label: `Новый пароль`,
            type: `password`
        },
        {
            name: `confirmPassword`,
            label: `Повторите новый пароль`,
            type: `password`
        }
    ].map(item => new Inputs(item).element),
    controls: [
        {
            label: `Сохранить`,
            style: `yellow-button`,
            onclick: () => console.log(`Сохранить`)
        },
        {
            label: `Отмена`,
            style: `transparent-button`,
            onclick: () => console.log(`Отмена`)
        }
    ].map((item) => new ControlsButton(item).element),
}), `#root`);
