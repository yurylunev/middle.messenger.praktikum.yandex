import {expect} from 'chai';
import Templator from './templator';

describe('Templator tests:', async () => {
  it('Create DIV element', () => {
    const template = '<div></div>';
    const element = new Templator(template).compile({});
    expect(element[0].outerHTML).to.equal(template);
  });

  it('Create P element with params', () => {
    const template = '<p>{{ id }}: {{username}}</p>';
    const element = new Templator(template).compile({username: 'John Doe', id: 123});
    expect(element[0].outerHTML).to.equal('<p>123: John Doe</p>');
  });

  it('Get Object by path', () => {
    const templator = new Templator('<div>{{id}}</div>');
    const o = templator._getObjectFromContext({
      context: {path: {id: 123}},
    }, 'context.path.id', {});
    expect(o).to.equal(123);
  });

  it('Get defaultValue from Context', () => {
    const templator = new Templator('');
    expect(templator._getObjectFromContext({context: {path: {id: 123}},
    }, 'path.content', {a: 123})).to.deep.equal({a: 123});
    expect(templator._getObjectFromContext({context: {path: {id: 123}},
    }, 'path.content', {})).to.deep.equal({});
    expect(templator._getObjectFromContext({context: {path: {id: 123}},
    }, 'path.content', '')).to.deep.equal('');
  });
});
