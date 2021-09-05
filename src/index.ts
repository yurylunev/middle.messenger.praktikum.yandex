import Router from './utils/router';
import SignInPage from './pages/auth/signin';
import SignupPage from './pages/auth/signup';
import SettingsPage from './pages/settings/settings';
import ChangePasswordPage from './pages/settings/change-password';
import EditProfilePage from './pages/settings/edit-profile';
import MessengerPage from './pages/messenger/messenger';
import ErrorPage500 from './pages/errors/5xx';
import ErrorPage404 from './pages/errors/404';
import './css/palette.pcss';

const router = new Router('#root');

router
    .use('/', SignInPage)
    .use('/sign-up', SignupPage)
    .use('/settings', SettingsPage)
    .use('/settings/change-password', ChangePasswordPage)
    .use('/settings/edit-profile', EditProfilePage)
    .use('/messenger', MessengerPage)
    .use('/404', ErrorPage404)
    .use('/5xx', ErrorPage500)
    .start();
