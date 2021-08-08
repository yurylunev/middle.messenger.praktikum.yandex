const getInputsData = (event) => {
    const data = {};
    const inputFields = document.querySelectorAll(`.input-field input`);
    inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
    console.log(data);
}

const getSendMessage = (events) => {
    const message: HTMLInputElement = document.querySelector(`input[name=message]`);
    console.log(message.value);
}

export {getInputsData, getSendMessage}
