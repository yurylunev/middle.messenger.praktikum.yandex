import Block from '../../utils/block';
import Inputs from '../../components/inputs/inputs';
import ControlsButton from '../../components/controls-button/controls-button';
import {getInputsData} from '../../utils/handlers';
import Router from '../../utils/router';
import changePasswordTemplate from './change-password.tmpl';
import UsersController from '../../controllers/users-controller';

class ChangePasswordPage extends Block {
  async componentDidMount() {
    this.setProps({
      headerText: `Сменить пароль`,
      style: `editable`,
      inputs: [
        {
          name: `oldPassword`,
          label: `Старый пароль`,
          type: `password`,
        },
        {
          name: `newPassword`,
          label: `Новый пароль`,
          type: `password`,
        },
        {
          name: `confirmPassword`,
          label: `Повторите новый пароль`,
          type: `password`,
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
      ].map((item) => new ControlsButton(item).element),
      events: {
        'button.back': {
          click: () => Router.back(),
        },
        '.yellow-button': {
          click: () => {
            UsersController.changeUserPassword(getInputsData());
            Router.go('/settings');
          },
        },
        '.transparent-button': {
          click: () => Router.go('/settings'),
        },
      },
    });
  }

  render(): string {
    return changePasswordTemplate;
  }
}

export default ChangePasswordPage;
