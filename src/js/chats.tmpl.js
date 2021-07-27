const chatsPageTemplate = () => `
<div class="chat-list">
        <div class="search-wrapper">
            <div class="profile-edit">
                <a href="#">Профиль</a>
            </div>
            <div class="search">
                <input type="text" name="search" id="search" placeholder="Поиск">
            </div>
        </div>
        <div class="chats-area">
            {{chats}}
        </div>
        </div>
        <div class="conversation-wrapper">
        <div class="header">
            <img src="/static/images/avatar_placeholder.png" alt="" height="34px"
                 width="34px" class="avatar">
            <div class="username">Коля</div>
            <div class="time">
                <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.5" cy="2" r="1.5" fill="#565856"/>
                    <circle cx="1.5" cy="8" r="1.5" fill="#565856"/>
                    <circle cx="1.5" cy="14" r="1.5" fill="#565856"/>
                </svg>
            </div>
        </div>
        <div class="conversation">
            {{messages}}
        </div>
        <div class="sending-area">
            <img src="/static/images/icon-attach.svg" alt="">
            <input type="text" class="input-message" name="message" placeholder="Сообщение">
            <button class="send-message">
                <img src="/static/images/icon-rocket.svg" alt="">
            </button>

        </div>
    </div>
</div>
`;

const chatsTemplate = () => `
            <div class="chat">
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
            </div>
`;
const myMessageTemplate = () => `
            <div class="message">
                <div class="my-message">
                    <div>{{textMessage}}</div>
                    <div class="time">
                        <img src=/static/images/msg-status-{{statusMessage}}.svg" alt="">
                        {{timeMessage}}
                    </div>
                </div>
            </div>
`;
const foreignMessageTemplate = () => `
            <div class="message">
                <div class="foreign-message">
                    <div>{{textMessage}}</div>
                    <div class="time">{{timeMessage}}</div>
                </div>
            </div>
`;
const foreignImageTemplate = () => `
            <div class="message">
                <div class="foreign-message foreign-message_image">
                    <img src="/static/images/{{imageURL}}" alt="">
                    <div class="time">
                        {{timeMessage}}
                    </div>
                </div>
            </div>`;
const dateHeaderTemplate = () => `
            <div class="message">
                <div class="date">
                    {{date}}
                </div>
            </div>
`;

window.chatsTemplate = (chatsTemplate)().trim();
window.dateHeaderTemplate = (dateHeaderTemplate()).trim();
window.myMessageTemplate = (myMessageTemplate()).trim();
window.foreignMessageTemplate = (foreignMessageTemplate()).trim();
window.foreignImageTemplate = (foreignImageTemplate()).trim();
window.chatsPageTemplate = (chatsPageTemplate)().trim();
