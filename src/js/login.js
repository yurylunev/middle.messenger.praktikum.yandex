const loginWindow = new window.Templator(window.loginWindowTemplate);
const inputFields = new window.Templator(window.inputFieldsTemplate);

const context = {
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
    ].map(item => inputFields.compile(item)).join(``),
    entryButtonText: `Авторизоваться`,
    noEntryButtonText: `Нет аккаунта`
};

const root = document.querySelector(`#root`);
root.innerHTML = loginWindow.compile(context);
