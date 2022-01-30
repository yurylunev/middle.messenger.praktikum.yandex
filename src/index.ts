import Router from './utils/router';
import SignInPage from './pages/auth/signin';
import SignupPage from './pages/auth/signup';
import SettingsPage from './pages/settings/index';
import ChangePasswordPage from './pages/settings/change-password';
import EditProfilePage from './pages/settings/edit-profile';
import MessengerPage from './pages/messenger/messenger';
import ErrorPage500 from './pages/errors/5xx';
import ErrorPage404 from './pages/errors/404';
import './css/palette.pcss';
import AuthController from './controllers/auth-controller';

AuthController.checkAuth()
    .then(() => {
      const router = new Router();
      router
          .use('/', SignInPage, false)
          .use('/sign-up', SignupPage, false)
          .use('/settings', SettingsPage)
          .use('/settings/change-password', ChangePasswordPage)
          .use('/settings/edit-profile', EditProfilePage)
          .use('/messenger', MessengerPage)
          .use('/404', ErrorPage404)
          .use('/5xx', ErrorPage500)
          .start();
    },
    );
