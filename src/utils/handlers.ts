const getInputsData = (event) => {
    const data = {};
    const inputFields = document.querySelectorAll(`.input-field input`);
    inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
    console.log(data);
}

const getSendMessage = (event) => {
    const message: HTMLInputElement = document.querySelector(`input[name=message]`);
    console.log(message.value);
}

const isValidInput = (event): { status: boolean; value: string } => {
    const inputElement: HTMLInputElement = event.target;

    const checkEmail = (value: string) => {
        return {status: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value), value};
    }

    const checkLogin = (value: string) => {
        return {status: true, value};
    }

    const checkName = (value: string) => {
        return {status: true, value};
    }

    const checkPhone = (value: string) => {
        value = value.replace(/\D/ig, ``);
        return {
            status: (value.length === 11),
            value: value.replace(/(^\d)(\d{3})(\d{3})(\d{2})(\d{2})$/i, `+$1 ($2) $3-$4-$5`)
        };
    }

    const checkPassword = (value: string) => {
        return {
            status: /^.{6,}$/i.test(value),
            value
        };
    }

    const checkPasswordConfirmation = (value: string) => {
        return {
            status: (<HTMLInputElement>document.querySelector(`input[name=password]`)).value === value,
            value
        }
    }

    const checkMessage = (value: string) => {
        return {status: true, value};
    }

    switch (inputElement.name) {
        case `email`:
            return checkEmail(inputElement.value);
        case `login`:
            return checkLogin(inputElement.value);
        case `first_name`:
        case `second_name`:
        case `display_name`:
            return checkName(inputElement.value);
        case `phone`:
            return checkPhone(inputElement.value);
        case `password`:
            return checkPassword(inputElement.value);
        case `confirm-password`:
            return checkPasswordConfirmation(inputElement.value);
        case `message`:
            return checkMessage(inputElement.value);

    }
}

const checkInputField = (event) => {
    const errorArea = event.target.parentNode.parentNode.querySelector(`.error-message`);
    const checkedValue = isValidInput(event);
    if (errorArea)
        errorArea.classList.toggle(`hidden`, checkedValue.status);
    else
        event.target.classList.toggle(`error-color`, !checkedValue.status)
    console.log(event.target, checkedValue);
    event.target.value = checkedValue.value;
}

export {getInputsData, getSendMessage, isValidInput, checkInputField}
