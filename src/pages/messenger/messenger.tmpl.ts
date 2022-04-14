import './messenger.pcss';

export default `<div class="chat-list">
        <div class="search-wrapper">
            <div class="profile-edit">
                <button>Профиль</button>
            </div>
            <div class="search">
            <form>
                <input type="text" name="search" id="search" 
                    placeholder="Введите название нового чата">
            </form>
            </div>
        </div>
        <ul class="chats-area">
            {{chats}}
        </ul>
        </div>
        <div class="conversation-wrapper">
            <div class="header">
                <img src="{{avatarUrl}}" height="34px"
                    width="34px" class="avatar">
                <div class="username">{{username}}</div>
                <div class="more-action">
                    <svg width="3" height="16" viewBox="0 0 3 16" fill="none" 
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="2" r="1.5" fill="#565856"/>
                        <circle cx="1.5" cy="8" r="1.5" fill="#565856"/>
                        <circle cx="1.5" cy="14" r="1.5" fill="#565856"/>
                    </svg>
                </div>
                <div class="more-action-window hidden">
                    <ul>
                        <li data-action="add-user">Добавить пользователя</li>
                        <li data-action="del-user">Удалить пользователя</li>
                        <li data-action="remove-chat">Удалить чат</li>
                    </ul>
                </div>
            </div>
            <div class="conversation">
            {{messages}}
            </div>
            <div class="sending-area">
                <img src="/static/images/icon-attach.svg">
                <form>
                  <input type="text" class="input-message" name="message" placeholder="Сообщение">
                  <button class="send-message" type="submit">
                      <img src="/static/images/icon-rocket.svg">
                  </button>
                </form>
            </div>
        </div>
    </div>`;
