import Block from "../../utils/block";

class ChatsPage extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="chat-list">
        <div class="search-wrapper">
            <div class="profile-edit">
                <a href="#">Профиль</a>
            </div>
            <div class="search">
                <input type="text" name="search" id="search" placeholder="Поиск">
            </div>
        </div>
        <ul class="chats-area">
            {{chats}}
        </ul>
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
    }
}

export default ChatsPage;