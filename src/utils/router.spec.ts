import {expect} from 'chai';
import Router from './router';
import SignUp from '../pages/auth/signup';
import SettingsPage from '../pages/settings/settings';
import {store} from '../store';

Router
    .use('/sign-up', SignUp, false)
    .use('/settings', SettingsPage);


describe('Router tests:', async () => {
  it('Router should be Singleton', () => {
    const instance1 = Router;
    const instance2 = Router;

    expect(instance1).to.equal(instance2);
  });

  it('getRoute should return unsecure SignUp Page', () => {
    const page = Router.getRoute('/sign-up');
    page?.createInstance();
    expect(page?.Instance).to.be.an.instanceof(SignUp);
    // @ts-ignore
    expect(page?._props.isSecure).to.equal(false);
  });

  it('getRoute should return secure Settings Page authorized user', () => {
    store.getState().user.isAuthorized = true;
    const page = Router.getRoute('/settings');
    // page?.createInstance();
    // expect(page).to.equal(null);
    page?.createInstance();
    expect(page?.Instance).to.be.an.instanceof(SettingsPage);
    // @ts-ignore
    expect(page?._props.isSecure).to.equal(true);
  });

  it('getRoute should not return secure Page unauthorized user', () => {
    store.getState().user.isAuthorized = false;
    const page = Router.getRoute('/settings');
    page?.createInstance();
    expect(page).to.equal(null);
  });
});
