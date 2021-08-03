class Templator {
    private readonly _template: string;

    constructor(template: string) {
        this._template = template;
    }

    _uuid(): string {
        return Math.random().toString().split('.')[1].slice(0, 8);
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

    compile(ctx): string {
        const replaces = Array.from(this._template.matchAll(/{{(.*?)}}/ig));
        return replaces.reduce((template: string, rulesMap: string[]) => {
            const [rule, objectName] = [...rulesMap];
            const contextObject = this._getObjectFromContext(ctx, objectName.trim(), ``);
            if (typeof contextObject === `function`) {
                const functionName = `${objectName}${this._uuid()}`;
                window[functionName] = contextObject;
                return template.replace(rule, `window.${functionName}()`);
            }
            return template.replace(rule, contextObject);
        }, this._template);
    }
}

export default Templator;
