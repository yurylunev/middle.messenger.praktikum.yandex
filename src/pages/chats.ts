import {
    ChatsPage,
    ChatList,
    ForeignImage,
    ForeignMessage,
    DateHeader,
    MyMessage
} from '../components/chats.tmpl';
import render from "../utils/renderDOM";
import {getSendMessage} from "../utils/handlers";

render(new ChatsPage({
    chats: [
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Илья`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `Чт`,
            unreadCount: ``

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Андрей`,
            lastMessage: `Друзья, у меня`,
            messageTime: `13:00`,
            unreadCount: `24`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Андрей`,
            lastMessage: `Друзья, у меня`,
            messageTime: `13:00`,
            unreadCount: `24`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Андрей`,
            lastMessage: `Друзья, у меня`,
            messageTime: `13:00`,
            unreadCount: `24`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Саша`,
            lastMessage: `Друзья, у меня`,
            messageTime: `13:00`,
            unreadCount: `24`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Андрей`,
            lastMessage: `Друзья, у меня`,
            messageTime: `13:00`,
            unreadCount: `24`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Саша`,
            lastMessage: `Друзья, у меня`,
            messageTime: `13:00`,
            unreadCount: `24`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        },
        {
            avatarUrl: `avatar_placeholder.png`,
            username: `Коля`,
            lastMessage: `Друзья, у меня для вас особенный выпуск новостей...`,
            messageTime: `1 мая 2020`,
            unreadCount: `4`

        }
    ].map((item) => new ChatList(item).element),
    currentAccount: {username: `Коля`, avatarUrl: `avatar_placeholder.png`},
    messages: [
        {
            messageType: `dateHeader`,
            date: `20 июля 2022`,
        },
        {
            messageType: `foreignMessage`,
            textMessage: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            timeMessage: `11:00`,
        },
        {
            messageType: `foreignImage`,
            imageURL: `image.png`,
            timeMessage: `11:00`,
        },
        {
            messageType: `myMessage`,
            textMessage: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
            timeMessage: `11:00`,
            statusMessage: `read`
        }
    ].reverse().map((item) => {
        console.log(item);
        switch (item.messageType) {
            case "dateHeader":
                return new DateHeader(item).element;
            case "myMessage":
                return new MyMessage(item).element;
            case "foreignMessage":
                return new ForeignMessage(item).element;
            case "foreignImage":
                return new ForeignImage(item).element;
            default:
                return document.createElement(`div`);
        }
    }),
    events: {
        ".send-message": {
            click: getSendMessage
        }
    }
}), `#root`);
