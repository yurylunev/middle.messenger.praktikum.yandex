import Block from '../../utils/block';
import Avatar from '../../components/avatar/avatar';
import Inputs from '../../components/inputs/inputs';
import ControlsButton from '../../components/controls-button/controls-button';
import {getInputsData} from '../../utils/handlers';
import Router from '../../utils/router';
import changePasswordTemplate from './change-password.tmpl';

const router = new Router();

class ChangePasswordPage extends Block {
  constructor() {
    super(undefined, {
      headerText: `Сменить пароль`,
      avatar: new Avatar({avatarUrl: `icon-image-placeholder.svg`, name: `avatar`}).element,
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
          click: () => router.go('/settings'),
        },
        '.yellow-button': {
          click: () => {
            getInputsData();
            router.go('/settings');
          },
        },
        '.transparent-button': {
          click: () => router.go('/settings'),
        },
      },
    });
  }

  render(): string {
    return changePasswordTemplate;
  }
}

export default ChangePasswordPage;
