import ControlsButton from '../components/controls-button/controls-button';
import Inputs from '../components/inputs/inputs';
import UserinfoPage from '../components/userinfo-page/userinfo-page';
import {getInputsData} from '../utils/handlers';
import render from '../utils/renderDOM';
import Avatar from '../components/avatar/avatar';

render(new UserinfoPage({
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
    '.yellow-button': {
      click: getInputsData,
    },
  },
}), `#root`);
