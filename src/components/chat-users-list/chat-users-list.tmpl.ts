import './chat-users-list.pcss';

export default `
<div class="chat-users">
    <img src="{{avatarUrl}}" height="32px"
         width="32px" class="avatar">
    <div class="message-info">
        <div class="message-header">
            <div class="user-login">{{login}}</div>
        </div>
        <div class="message-short">
            <div class="user-name">{{first_name}} {{second_name}}</div>
        </div>
    </div>
    <div class="delete-user" data-user_id="{{id}}">
        <div>+</div>
    </div>
</div>`;
