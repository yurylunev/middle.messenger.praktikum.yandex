import Block from '../../utils/block';
import Router from '../../utils/router';
import InputField from '../../components/input-field/input-field';
import {getInputsData} from '../../utils/handlers';
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
        },
        {
          name: `password`,
          label: `Пароль`,
          errorMessage: `Неверный логин или пароль`,
          type: `password`,
        },
      ].map((item) => new InputField(item).element),
      entryButtonText: `Авторизоваться`,
      noEntryButtonText: `Нет аккаунта`,
      events: {
        '.entry': {
          'click': async () =>
            AuthController
                .signin(getInputsData())
                .then(() => Router.go('/messenger'))
                .catch(() => {
                  document.querySelector('.error-message')?.classList.remove('hidden');
                }),
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
