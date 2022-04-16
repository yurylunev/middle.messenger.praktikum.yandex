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

  // it('Create UL>LI nested elements with params', () => {
  //   const template = '<ul>{{list}}</ul>';
  //   const list = [{id: 1}, {id: 2}]
  //       .map((li) => (new Templator('<li>{{id}}</li>').compile({id: li.id}))[0]);
  //   // console.log(list[0].outerHTML, list[1].outerHTML);
  //   const element = new Templator(template).compile({list});
  //   console.log(element);
  //   expect(element[0].outerHTML).to.equal('<ul><li>1</li><li>2</li></ul>');
  // });
});
