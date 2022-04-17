import './chat.pcss';

export default `
<li class="chat" data-chat_id="{{chatId}}">
    <img src="{{ avatarUrl }}" height="47px"
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
</li>`;
