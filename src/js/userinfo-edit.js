const userinfoPage = new window.Templator(window.userinfoPageTemplate);
const avatar = new window.Templator(window.avatarTemplate);
const inputs = new window.Templator(window.inputsTemplate);
const controls = new window.Templator(window.controlsButtonsTemplate);

const context = {
    headerText: `Иван`,
    avatar: avatar.compile({avatarUrl: `icon-image-placeholder.svg`}),
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