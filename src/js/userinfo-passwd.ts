import Templator from "./templator";
import {userinfoPageTemplate, inputsTemplate, controlsButtonsTemplate} from "./userinfo.tmpl";

const userinfoPage = new Templator(userinfoPageTemplate);
const inputs = new Templator(inputsTemplate);
const controls = new Templator(controlsButtonsTemplate);

const context = {
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
    ].map(item => inputs.compile(item)).join(``),
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
    ].map((item) => controls.compile(item)).join(``),
};

const root = document.querySelector(`#root`);
root.innerHTML = userinfoPage.compile(context);
