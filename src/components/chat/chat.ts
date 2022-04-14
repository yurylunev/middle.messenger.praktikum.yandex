import Block from '../../utils/block';
import chatTemplate from './chat.tmpl';

class Chat extends Block {
  constructor(props: any) {
    super({
      avatarUrl: props.avatar || '/static/images/avatar_placeholder.png',
      username: props.title || '',
      messageTime: props.last_message?.time || '',
      lastMessage: props.last_message?.content || '',
      unreadCount: props.unread_count || 0,
    });
  }

  render(): string {
    return chatTemplate;
  }
}

export default Chat;
