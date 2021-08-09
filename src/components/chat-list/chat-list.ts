import Block from "../../utils/block";

class ChatList extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
            <li class="chat">
                <img src="/static/images/{{ avatarUrl }}" alt="" height="47px"
                     width="47px" class="avatar">
                <div class="message-info">
                    <div class="message-header">
                        <div class="username">{{username}}</div>
                        <div class="time">{{messageTime}}</div>
                    </div>
                    <div class="message-short">
                        <div class="last-message">{{lastMessage}}</div>
                        <div class="unread">{{unreadCount}}</div>
                    </div>
                </div>
            </li>
`;
    }
}

export default ChatList;