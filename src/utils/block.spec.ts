// @ts-ignore
import chai, {expect} from 'chai';
// @ts-ignore
import chaiDom from 'chai-dom';
// @ts-ignore
import sinon from 'sinon';
// @ts-ignore
import sinonChai from 'sinon-chai';
import SignInPage from '../pages/auth/signin';
import {MessengerPage} from '../pages/messenger/messenger';
import Avatar from '../components/avatar/avatar';

chai.use(chaiDom).use(sinonChai);

before(function() {
  XMLHttpRequest = sinon.useFakeXMLHttpRequest();
});

after(function() {
  // @ts-ignore
  XMLHttpRequest.restore();
});

describe('Components tests:', async () => {
  it('Component should set props', () => {
    const root = new Avatar({avatarUrl: '/avatar.png', name: 'name-before', noEdit: true});
    const state = {before: {HTML: '', property: ''}, after: {HTML: '', property: ''}};
    state.before.HTML = root!.element!.children[0].innerHTML;
    // @ts-ignore
    state.before.property = root!.element?.querySelector('[name=avatar] img')?.getAttribute('src');
    root.setProps({avatarUrl: '/avatar2.png', name: 'name-after', noEdit: false});
    state.after.HTML = root!.element!.children[0].innerHTML;
    // @ts-ignore
    state.after.property = root!.element?.querySelector('[name=avatar] img')?.getAttribute('src');
    expect(state.before.HTML).to.not.equal(state.after.HTML);
    expect(state.before.property).to.equal('https://ya-praktikum.tech/api/v2/resources/avatar.png');
    expect(state.after.property).to.equal('/avatar2.png');
  });

  it('SignIn Page should have login/password', () => {
    const root = new SignInPage().element;
    expect(root?.querySelector('h2')).to.have.text('Вход');
    expect(root?.querySelector('button.entry')).to.have.text('Авторизоваться');
    expect(root?.querySelector('button.noEntry')).to.have.text('Нет аккаунта');
  });

  it('Messenger Page should have createChat/sendMessage fields', () => {
    const root = new MessengerPage().element;
    expect(root?.querySelector('.profile-edit button')).to.have.text('Профиль');
    expect(root?.querySelector('.chat-list input[name=search]')).to.exist;
    expect(root?.querySelector('.sending-area input[name=message]')).to.exist;
  });
});
