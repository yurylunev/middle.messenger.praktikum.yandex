import Block from '../../utils/block';
import Avatar from '../../components/avatar/avatar';
import Inputs from '../../components/inputs/inputs';
import ControlField from '../../components/control-field/control-field';
import {
  changeAvatar,
  checkInputField,
  getAvatarFormData,
  getInputsData,
} from '../../utils/handlers';
import Router from '../../utils/router';
import editProfileTemplate from './settings.tmpl';
import {withRouter} from '../../utils/router';
import {connect} from '../../store';
import AuthController from '../../controllers/auth-controller';
import UsersController from '../../controllers/users-controller';

class EditProfilePage extends Block {
  async componentDidMount() {
    AuthController.getUserInfo().then((userInfo) => {
      this.setProps({
        headerText: userInfo.display_name || '',
        avatar: new Avatar({
          avatarUrl: userInfo.avatar || ``,
          name: `avatar`,
        }).element,
        style: `editable`,
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
            label: `Сохранить`,
            style: `yellow-button`,
          },
          {
            label: `Отмена`,
            style: `transparent-button`,
          },
          {
            style: `invisible`,
          },
        ].map((item) => new ControlField(item).element),
        events: {
          'button.back': {
            click: () => Router.back(),
          },
          '.yellow-button': {
            click: async () => {
              const avatarData = getAvatarFormData();
              const inputsData = getInputsData();
              if (avatarData) {
                await UsersController.updateUserAvatar(avatarData);
              }
              if (inputsData) {
                await UsersController.updateUserProfile(inputsData);
              }
              Router.go('/settings');
            },
          },
          '.transparent-button': {
            click: () => Router.go('/settings'),
          },
          'input': {
            blur: checkInputField,
          },
          '.avatar-wrapper input': {
            change: changeAvatar,
          },
        },
      });
    });
  }

  render(): string {
    return editProfileTemplate;
  }
}

export {EditProfilePage};
export default withRouter(connect((state) => ({user: state.user}), EditProfilePage));
