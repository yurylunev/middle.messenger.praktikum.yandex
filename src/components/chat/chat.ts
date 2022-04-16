import Block from '../../utils/block';
import chatTemplate from './chat.tmpl';

class Chat extends Block {
  constructor(props: any) {
    super({
      chatId: props.id,
      avatarUrl: props.avatar || '/static/images/avatar_placeholder.png',
      username: props.title || '',
      messageTime: new Date(props.last_message?.time).toLocaleTimeString() || '',
      lastMessage: props.last_message?.content || '',
      unreadCount: props.unread_count || '',
    });
  }

  render(): string {
    return chatTemplate;
  }
}

export default Chat;
