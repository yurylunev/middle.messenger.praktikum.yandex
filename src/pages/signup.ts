import InputField from '../components/input-field/input-field';
import {checkInputField, getInputsData} from '../utils/handlers';
import Router from '../utils/router';
import HTTPTransport from '../utils/http-transport';

const router = new Router('#root');
const signupAPI = new HTTPTransport('/auth/signup');

const signUpProps = {
  headerText: `Регистрация`,
  inputFields: [
    {
      name: `email`,
      label: `Почта`,
      errorMessage: `Неверный адрес электронной почты`,
    },
    {
      name: `login`,
      label: `Логин`,
      errorMessage: `Имя уже занято`,
    },
    {
      name: `first_name`,
      label: `Имя`,
      errorMessage: `Недопустимые символы`,
    },
    {
      name: `second_name`,
      label: `Фамилия`,
      errorMessage: `Недопустимые символы`,
    },
    {
      name: `phone`,
      label: `Телефон`,
      errorMessage: `Телефон указан неверно`,
    },
    {
      name: `password`,
      label: `Пароль`,
      errorMessage: `Слишком короткий пароль`,
      type: `password`,
    },
    {
      name: `confirm-password`,
      label: `Пароль (ещё раз)`,
      errorMessage: `Пароли не совпадают`,
      type: `password`,
    },
  ].map((item) => new InputField(item).element),
  entryButtonText: `Зарегистрироваться`,
  noEntryButtonText: `Войти`,
  events: {
    '.entry': {
      click: async () => {
        signupAPI
            .post('', {
              withCredentials: true,
              data: getInputsData(),
              headers: {'Content-Type': 'application/json'},
            })
            .then((response) => (response.status === 200) ? router.go('/') : null);
      },
    },
    'input': {
      blur: checkInputField,
    },
    '.noEntry': {
      click: () => router.go('/'),
    },
  },
};

export default signUpProps;
