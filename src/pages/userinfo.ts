import Avatar from '../components/avatar/avatar';
import Inputs from '../components/inputs/inputs';
import ControlField from '../components/control-field/control-field';
import Router from '../utils/router';

const router = new Router('#root');

const userinfoPageProps = {
  headerText: `Иван`,
  avatar: new Avatar({avatarUrl: `icon-image-placeholder.svg`, name: `avatar`}).element,
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
      click: () => router.go('/messenger'),
    },
    'button.edit-profile': {
      click: () => router.go('/settings/edit-profile'),
    },
    'button.change-password': {
      click: () => router.go('/settings/change-password'),
    },
    'button.red-color': {
      click: () => router.go('/'),
    },
  },
};

export default userinfoPageProps;
