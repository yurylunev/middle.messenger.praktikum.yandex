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

    _getObjectFromContext(obj, path, defaultValue) {
        const keys = path.split(`.`);

        const f = (obj, _cursor = 0) => {
            const currentObject = (!_cursor) ? obj : obj[keys[_cursor - 1]];
            if (currentObject.hasOwnProperty(keys[_cursor])) {
                if ((keys.length - 1) === (_cursor)) {
                    return currentObject[keys[_cursor]];
                }
                return f(currentObject, _cursor + 1);
            } else {
                return defaultValue;
            } //TODO Does not work!
        }
        return f(obj);
    }

    _insertHTMLElement({rule, contextObject}) {
        const placeholder: XPathResult = document.evaluate(`//text()[contains(., '${rule}')]`, this._element, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (placeholder.singleNodeValue !== null) {
            const replaceNodes = ((Symbol.iterator in Object(contextObject)) ? contextObject : [contextObject]);
            (<HTMLElement>placeholder.singleNodeValue).replaceWith(...replaceNodes);
        }
    }

    compile(ctx): HTMLCollection {
        const replaces = Array.from(this._template.matchAll(/{{(.*?)}}/ig));
        const outerElements = [];
        this._element.innerHTML = replaces.reduce((template: string, rulesMap: string[]) => {
            const [rule, objectName] = [...rulesMap];
            const contextObject = this._getObjectFromContext(ctx, objectName.trim(), ``);
            if (typeof contextObject === `object`) {
                outerElements.push({rule, contextObject});
                return template;
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
