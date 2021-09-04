import InputField from '../components/input-field/input-field';
import {checkInputField, getInputsData} from '../utils/handlers';
import Router from '../utils/router';
import HTTPTransport from '../utils/http-transport';

const router = new Router('#root');
const loginAPI = new HTTPTransport('/auth/signin');

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
      'click': async () => {
        const data = getInputsData();
        if (data.login !== '' && data.password !== '') {
          loginAPI
              .post('', {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                data,
              })
              .then((response) => (response.status === 200) ? router.go('/messenger') : null);
        }
      },
    },
    'input': {
      blur: (e: Event) => {
        checkInputField(e);
      },
    },
    '.noEntry': {
      click: () => router.go('/sign-up'),
    },
  },
};

export default signInProps;
