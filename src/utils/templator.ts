class Templator {
  private readonly _template: string;
  private readonly _element: HTMLElement;

  constructor(template: string) {
    this._template = template;
    this._element = this._createContainerElement();
  }

  protected _createContainerElement() {
    return document.createElement('div');
  }

  _getObjectFromContext(obj: object, path: string, defaultValue: object) {
    const keys = path.split(`.`);
    // @ts-ignore
    const f = (obj: object, _cursor: number = 0) => {
      // @ts-ignore
      const currentObject = (!_cursor) ? obj : obj[keys[_cursor - 1]];
      if (currentObject.hasOwnProperty(keys[_cursor])) {
        if ((keys.length - 1) === (_cursor)) {
          return currentObject[keys[_cursor]];
        }
        return f(currentObject, _cursor + 1);
      } else {
        return defaultValue;
      } // TODO Does not work!
    };
    return f(obj);
  }

  _insertHTMLElement({rule, contextObject}:
    { rule: string,
      contextObject: DocumentFragment | DocumentFragment[] | HTMLElement | HTMLElement[] }) {
    const placeholder: XPathResult = document.evaluate(`//text()[contains(., '${rule}')]`,
        this._element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    // console.log({rule, contextObject});
    if (placeholder.singleNodeValue !== null) {
      const replaceNodes: (DocumentFragment | HTMLElement)[] = Array.isArray(contextObject) ?
        contextObject : [contextObject];
      (<HTMLElement>placeholder.singleNodeValue).replaceWith(...replaceNodes.map(
          (node) => document.importNode(node, true)));
    }
  }

  compile(ctx: any): HTMLCollection {
    const replaces = Array.from(this._template.matchAll(/{{(.*?)}}/ig));
    // console.log(replaces);
    const outerElements: { rule: string; contextObject: any; }[] = [];
    this._element.innerHTML = replaces.reduce((template: string, rulesMap: string[]) => {
      const [rule, objectName] = [...rulesMap];
      const contextObject = this._getObjectFromContext(ctx, objectName.trim(), {});
      if (typeof contextObject === `object` && contextObject.constructor.name !== 'Object') {
        outerElements.push({rule, contextObject});
        return template;
      } else {
        if (contextObject.constructor.name === 'Object') {
          return template.replace(rule, '');
        }
      }
      return template.replace(rule, contextObject);
    }, this._template);
    outerElements.forEach((item) => {
      this._insertHTMLElement(item);
    });
    return this._element.children;
  }
}

export default Templator;
