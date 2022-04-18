import Block from '../../utils/block';
import Chat from '../../components/chat/chat';
import {getInputText} from '../../utils/handlers';
import messengerTemplate from './messenger.tmpl';
import DateHeader from '../../components/date-header/date-header';
import MyMessage from '../../components/my-message/my-message';
import ForeignMessage from '../../components/foreign-message/foreign-message';
import ForeignImage from '../../components/foreign-image/foreign-image';
import Router from '../../utils/router';
import ChatsController from '../../controllers/chats-controller';
import {withRouter} from '../../utils/router';
import {connect, store} from '../../store';
import ChatUsersList from '../../components/chat-users-list/chat-users-list';

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
  private static addMessages(message: any) {
    // TODO Need give a reference to Conversation object
    if (message instanceof Array && message.length) {
    // @ts-ignore
      document.querySelector('.conversation')?.prepend(createMessage(message[0]));
    }
  }

  async componentDidMount() {
    ChatsController.init().then((chatsStore) => {
      this.setProps({
        chats: chatsStore.chatsList.map((chat: any) => new Chat(chat).element),
        username: chatsStore.currentChat?.title,
        avatarUrl: '/static/images/avatar_placeholder.png',
        messages: chatsStore.messages.map(createMessage),
        chatUsers: chatsStore.currentChat?.users
            .map((user: any) => new ChatUsersList(user).element),
        events: {
          '.sending-area form': {
            submit: (e: any) => {
              const message = getInputText(e);
              if (message !== '') {
                ChatsController.sendMessage(message);
              }
            },
          },
          '.profile-edit button': {
            click: () => Router.go('/settings'),
          },
          '.search-wrapper form': {
            submit: (e: any) => ChatsController
                .createChat(getInputText(e))
                .then(() => Router.go('/messenger')),
          },
          '.more-action-window form': {
            submit: (e: any) => ChatsController
                .addUserToChat(getInputText(e))
                .then(() => Router.go('/messenger')),
          },
          '.more-action': {
            click: () => document.querySelector('.more-action-window')?.classList
                .toggle('hidden'),
          },
          '.conversation': {
            click: () => document.querySelector('.more-action-window')?.classList
                .add('hidden'),
          },
          'li[data-action=delete-chat]': {
            click: () => {
              ChatsController.deleteChat();
              Router.go('/messenger');
            },
          },
          '.delete-user': {
            click: (e: any) => ChatsController
                .deleteUserFromChat(+e.target.parentNode.getAttribute('data-user_id'))
                .then(() => Router.go('/messenger')),
          },
          'div[data-action=delete-chat]': {
            click: () => ChatsController
                .deleteChat()
                .then(() => Router.go('/messenger')),
          },
          'li.chat': {
            click: (e: any) => ChatsController
                .setCurrentChat(e.currentTarget.getAttribute('data-chat_id'))
                .then(() => Router.go('/messenger')),
          },
        },
      })
      ;
    });
    store.on('messages:changed', () => {
      MessengerPage.addMessages(store.getState().chats.messages);
    });
  }

  render() {
    return messengerTemplate;
  }
}

export {MessengerPage};
export default withRouter(connect((state) => ({chats: state.chats}), MessengerPage));
