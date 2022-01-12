import Block from '../../utils/block';
import Chat from '../../components/chat/chat';
import {getSendMessage} from '../../utils/handlers';
import Router from '../../utils/router';
import messengerTemplate from './messenger.tmpl';
import DateHeader from '../../components/date-header/date-header';
import MyMessage from '../../components/my-message/my-message';
import ForeignMessage from '../../components/foreign-message/foreign-message';
import ForeignImage from '../../components/foreign-image/foreign-image';

type TMessages = {
  messageType: string;
  date?: string;
  textMessage?: string;
  timeMessage?: string;
  imageURL?: string;
  statusMessage?: string;
}

const createMessage = (item: TMessages) => {
  switch (item.messageType) {
    case 'dateHeader':
      return new DateHeader(item).element;
    case 'myMessage':
      return new MyMessage(item).element;
    case 'foreignMessage':
      return new ForeignMessage(item).element;
    case 'foreignImage':
      return new ForeignImage(item).element;
    default:
      return '';
  }
};
class MessengerPage extends Block {
  constructor() {
    super(undefined, {
      chats: [
        {
          avatarUrl: `avatar_placeholder.png`,
          username: `Илья`,
          lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
          messageTime: `Чт`,
          unreadCount: ``,

        },
      ].map((item) => new Chat(item).element),
      username: 'Колян',
      avatarUrl: '/static/images/avatar_placeholder.png',
      messages: [
        {
          messageType: `dateHeader`,
          date: `20 июля 2022`,
        },
        {
          messageType: `foreignMessage`,
          textMessage: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории 
          — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на 
          Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, 
          все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой 
          забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, 
          но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 
          25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
          timeMessage: `11:00`,
        },
        {
          messageType: `foreignImage`,
          imageURL: `image.png`,
          timeMessage: `11:00`,
        },
        {
          messageType: `myMessage`,
          textMessage: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — 
      НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. 
      Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки 
      этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали 
      только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло 
      не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну 
      из них недавно продали на аукционе за 45000 евро.`,
          timeMessage: `11:00`,
          statusMessage: `read`,
        },
      ].reverse().map(createMessage),
      events: {
        '.send-message': {
          click: getSendMessage,
        },
        '.profile-edit button': {
          click: () => Router.go('/settings'),
        },
      },
    });
  }

  render() {
    return messengerTemplate;
  }
}

export default MessengerPage;
