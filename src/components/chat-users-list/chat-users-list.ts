import Block from '../../utils/block';
import chatUsersListTemplate from './chat-users-list.tmpl';

class ChatUsersList extends Block {
  constructor(props: any) {
    super({
      ...props,
      avatarUrl: props.avatar ?
        `https://ya-praktikum.tech/api/v2/resources/${props.avatar}` :
        '/static/images/avatar_placeholder.png',
    });
  }

  render(): string {
    return chatUsersListTemplate;
  }
}

export default ChatUsersList;
