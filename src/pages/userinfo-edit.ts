import ControlsButton from '../components/controls-button/controls-button';
import Avatar from '../components/avatar/avatar';
import Inputs from '../components/inputs/inputs';
import {checkInputField, getInputsData} from '../utils/handlers';
import Router from '../utils/router';

const router = new Router('#root');

const userinfoEditProps = {
  headerText: `Иван`,
  avatar: new Avatar({avatarUrl: `icon-image-placeholder.svg`, name: `avatar`}).element,
  style: `editable`,
  inputs: [
    {
      name: `email`,
      label: `Почта`,
      value: `pochta@yandex.ru`,
    },
    {
      name: `login`,
      label: `Логин`,
      value: `ivanivanov`,
    },
    {
      name: `first_name`,
      label: `Имя`,
      value: `Иван`,
    },
    {
      name: `second_name`,
      label: `Фамилия`,
      value: `Иванов`,
    },
    {
      name: `display_name`,
      label: `Имя в чате`,
      value: `Иван`,
    },
    {
      name: `phone`,
      label: `Телефон`,
      value: `+7 (909) 967 30 30`,
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
    'input': {
      blur: checkInputField,
    },
  },
};

export default userinfoEditProps;
