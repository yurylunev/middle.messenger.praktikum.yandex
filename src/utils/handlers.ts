const getInputsData = () => {
  const data: any = {};
  const inputFields = document.querySelectorAll(`.input-field input`);
  inputFields.forEach((input: HTMLInputElement) => data[input.name] = input.value);
  return data;
};

const getAvatarFormData = (): FormData | null => {
  // @ts-ignore
  const avatarForm: HTMLFormElement | null = document.querySelector('.avatar-wrapper form');
  console.log(avatarForm);
  if (avatarForm !== null) {
    return new FormData(avatarForm);
  }
  return null;
};

const getSendMessage = () => {
  const message: HTMLInputElement | null = document.querySelector(`input[name=message]`);
  if (message) console.log(message.value);
};

const isValidInput = (event: Event): any => {
  const inputElement = <HTMLInputElement>event.target;

  const checkEmail = (value: string) => {
    return {status: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value), value};
  };

  const checkLogin = (value: string) => {
    return {status: true, value};
  };

  const checkName = (value: string) => {
    return {status: true, value};
  };

  const checkPhone = (value: string) => {
    value = value.replace(/\D/ig, ``);
    return {
      status: (value.length === 11),
      value: value.replace(/(^\d)(\d{3})(\d{3})(\d{2})(\d{2})$/i, `+$1 $2 $3-$4-$5`),
    };
  };

  const checkPassword = (value: string) => {
    return {
      status: /^.{6,}$/i.test(value),
      value,
    };
  };

  const checkPasswordConfirmation = (value: string) => {
    return {
      status: (<HTMLInputElement>document.querySelector(`input[name=password]`)).value === value,
      value,
    };
  };

  const checkMessage = (value: string) => {
    return {status: true, value};
  };

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
};

const checkInputField = (event: Event) => {
  const checkedValue: { status: boolean; value: string } = isValidInput(event);
  let errorArea;
  if (event.target !== null) {
    errorArea = ((<HTMLElement>event.target).parentNode !== null) ?
      // @ts-ignore
      (((<HTMLElement>event.target).parentNode.parentNode !== null) ?
        // @ts-ignore
        (<HTMLElement>event.target).parentNode.parentNode.querySelector(`.error-message`) :
        null) :
      null;

    if (errorArea) {
      errorArea.classList.toggle(`hidden`, checkedValue.status);
    } else {
      (<HTMLElement>event.target).classList.toggle(`error-color`, !checkedValue.status);
    }
    (<HTMLInputElement>event.target).value = checkedValue.value;
  }
};

const changeAvatar = function() {
  const avatarImage = this.previousElementSibling.getElementsByTagName('img')[0];
  console.log('Avatar changed', this.previousElementSibling.getElementsByTagName('img')[0]);
  if (this.files && this.files[0]) {
    console.log(avatarImage.attributes.src.value = URL.createObjectURL(this.files[0]));
  }
};

export {
  getInputsData,
  getSendMessage,
  isValidInput,
  checkInputField,
  changeAvatar,
  getAvatarFormData,
};
