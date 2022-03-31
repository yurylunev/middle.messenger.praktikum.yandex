import Block from '../../utils/block';
import Router from '../../utils/router';
import InputField from '../../components/input-field/input-field';
import {checkInputField, getInputsData} from '../../utils/handlers';
import signInTemplate from './signin.tmpl';
import AuthController from '../../controllers/auth-controller';

class SignInPage extends Block {
  constructor() {
    super({
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
          'click': async () =>
            AuthController.signin(getInputsData())
                .then(() => Router.go('/settings'))
                .catch((e) => console.error(e)),
        },
        'input': {
          blur: (e: Event) => {
            checkInputField(e);
          },
        },
        '.noEntry': {
          click: () => Router.go('/sign-up'),
        },
      },
    });
  }

  render() {
    return signInTemplate;
  }
}

export default SignInPage;
