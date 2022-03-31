import Block from '../../utils/block';
import Avatar from '../../components/avatar/avatar';
import Inputs from '../../components/inputs/inputs';
import ControlField from '../../components/control-field/control-field';
import settingsPageTemplate from './settings.tmpl';
import AuthController from '../../controllers/auth-controller';

class SettingsPage extends Block {
  async getStateFromProps() {
    AuthController.getUserInfo().then((userInfo) => {
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
            // @ts-ignore
            click: () => this.props.router.go('/settings'),
          },
          'button.edit-profile': {
            // @ts-ignore
            click: () => this.props.router.go('/settings/edit-profile'),
          },
          'button.change-password': {
            // @ts-ignore
            click: () => this.props.router.go('/settings/change-password'),
          },
          'button.red-color': {
            click: async () => {
              await AuthController.logout();
              // @ts-ignore
              this.props.router.go('/');
            },
          },
        },
      });
    });
  }

  render() {
    return settingsPageTemplate;
  }
}

export default SettingsPage;
