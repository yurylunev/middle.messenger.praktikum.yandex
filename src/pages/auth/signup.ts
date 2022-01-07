import Block from '../../utils/block';
import Router from '../../utils/router';
import InputField from '../../components/input-field/input-field';
import {checkInputField, getInputsData} from '../../utils/handlers';
import signupTemplate from './signup.tmpl';
import AuthController from '../../controllers/auth-controller';

const router = new Router();

class SignupPage extends Block {
  constructor() {
    super(undefined, {
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
          click: async () => new AuthController().signup(getInputsData(), '/messenger'),
        },
        'input': {
          blur: checkInputField,
        },
        '.noEntry': {
          click: () => router.go('/'),
        },
      },
    });
  }

  render() {
    return signupTemplate;
  }
}

export default SignupPage;
