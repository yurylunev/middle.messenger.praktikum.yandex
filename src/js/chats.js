const chats = new window.Templator(window.chatsTemplate);
const dateHeader = new window.Templator(window.dateHeaderTemplate);
const myMessage = new window.Templator(window.myMessageTemplate);
const foreignMessage = new window.Templator(window.foreignMessageTemplate);
const foreignImage = new window.Templator(window.foreignImageTemplate);
const chatsPage = new window.Templator(window.chatsPageTemplate);

const context = {
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
    ].map((item) => chats.compile(item)).join(``),
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
        let result = ``;
        console.log(item);
        switch (item.messageType) {
            case "dateHeader":
                console.log(`dateHeader`);
                result = dateHeader.compile(item);
                break;
            case "myMessage":
                console.log(`myMessage`);
                result = myMessage.compile(item);
                break;
            case "foreignMessage":
                console.log(`foreignMessage`);
                result = foreignMessage.compile(item);
                break;
            case "foreignImage":
                console.log(`foreignImage`);
                result = foreignImage.compile(item);
                break;
            default:
                console.log(`default`);
                result = ``;
        }
        console.log(result);
        return result;
    }).join(``)
};

const root = document.querySelector(`#root`);
root.innerHTML = chatsPage.compile(context);