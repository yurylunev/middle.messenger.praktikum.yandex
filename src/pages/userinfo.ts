import Avatar from '../components/avatar/avatar';
import Inputs from '../components/inputs/inputs';
import ControlField from '../components/control-field/control-field';
import UserinfoPage from '../components/userinfo-page/userinfo-page';
import render from '../utils/renderDOM';

render(new UserinfoPage({
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
    },
    {
      label: `Изменить пароль`,
    },
    {
      label: `Выйти`,
      style: `red-color`,
    },
  ].map((item) => new ControlField(item).element),
}), `#root`);
