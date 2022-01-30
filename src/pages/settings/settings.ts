import Block from '../../utils/block';
import Avatar from '../../components/avatar/avatar';
import Inputs from '../../components/inputs/inputs';
import ControlField from '../../components/control-field/control-field';
// import Router from '../../utils/router';
import settingsPageTemplate from './settings.tmpl';
import AuthController from '../../controllers/auth-controller';

class SettingsPage extends Block {
  constructor() {
    super({
      headerText: ``,
      avatar: new Avatar({avatarUrl: `icon-image-placeholder.svg`, name: `avatar`}).element,
      inputs: [
        {
          name: `email`,
          label: `Почта`,
          value: ``,
        },
        {
          name: `login`,
          label: `Логин`,
          value: ``,
        },
        {
          name: `first_name`,
          label: `Имя`,
          value: ``,
        },
        {
          name: `second_name`,
          label: `Фамилия`,
          value: ``,
        },
        {
          name: `display_name`,
          label: `Имя в чате`,
          value: ``,
        },
        {
          name: `phone`,
          label: `Телефон`,
          value: ``,
        },
      ].map((item) => new Inputs(item).element),
      controls: [
        {
          label: `Изменить данные`,
          style: `edit-profile`,
        },
        {
          label: `Изменить пароль`,
          style: `change-password`,
        },
        {
          label: `Выйти`,
          style: `red-color`,
        },
      ].map((item) => new ControlField(item).element),
      events: {
        'button.back': {
          // click: () => this.router.go('/messenger'),
        },
        'button.edit-profile': {
          // click: () => Router.go('/settings/edit-profile'),
        },
        'button.change-password': {
          // click: () => Router.go('/settings/change-password'),
        },
        'button.red-color': {
          click: async () => {
            await AuthController.logout();
            // Router.go('/');
          },
        },
      },
    });
  }

  async componentDidMount() {
    AuthController.getUserInfo().then((userInfo) => {
      console.log(userInfo, this);
      this.setProps({
        headerText: userInfo.display_name || '',
        avatar: new Avatar({avatarUrl: `icon-image-placeholder.svg`, name: `avatar`}).element,
        inputs: [
          {
            name: `email`,
            label: `Почта`,
            value: userInfo.email,
          },
          {
            name: `login`,
            label: `Логин`,
            value: userInfo.login,
          },
          {
            name: `first_name`,
            label: `Имя`,
            value: userInfo.first_name,
          },
          {
            name: `second_name`,
            label: `Фамилия`,
            value: userInfo.second_name,
          },
          {
            name: `display_name`,
            label: `Имя в чате`,
            value: userInfo.display_name || '',
          },
          {
            name: `phone`,
            label: `Телефон`,
            value: userInfo.phone,
          },
        ].map((item) => new Inputs(item).element),
      });
    });
  }

  render() {
    return settingsPageTemplate;
  }
}

export default SettingsPage;
