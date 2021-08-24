import InputField from '../components/input-field/input-field';
import {checkInputField, getInputsData} from '../utils/handlers';
import Router from '../utils/router';

const router = new Router('#root');

const signInProps = {
  headerText: `Вход`,
  inputFields: [
    {
      name: `login`,
      label: `Логин`,
      errorMessage: `Неверный логин`,
    },
    {
      name: `password`,
      label: `Пароль`,
      errorMessage: `Неверный пароль`,
      type: `password`,
    },
  ].map((item) => new InputField(item).element),
  entryButtonText: `Авторизоваться`,
  noEntryButtonText: `Нет аккаунта`,
  events: {
    '.entry': {
      click: () => {
        getInputsData();
        router.go('/messenger');
      },
    },
    'input': {
      blur: checkInputField,
    },
    '.noEntry': {
      click: () => router.go('/sign-up'),
    },
  },
};

export default signInProps;
