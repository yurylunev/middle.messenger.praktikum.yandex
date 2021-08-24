import Router from '../utils/router';
import LoginWindow from '../components/login-window/login-window';
import UserinfoPage from '../components/userinfo-page/userinfo-page';
import ChatsPage from '../components/chats-page/chats-page';
import chatsPageProps from './chats';
import userinfoPageProps from './userinfo';
import signUpProps from './signup';
import signInProps from './login';
import userinfoPasswdProps from './userinfo-passwd';
import userinfoEditProps from './userinfo-edit';

const router = new Router('#root');

router
    .use('/', LoginWindow, signInProps)
    .use('/sign-up', LoginWindow, signUpProps)
    .use('/settings', UserinfoPage, userinfoPageProps)
    .use('/settings/change-password', UserinfoPage, userinfoPasswdProps)
    .use('/settings/edit-profile', UserinfoPage, userinfoEditProps)
    .use('/messenger', ChatsPage, chatsPageProps)
    .start();
