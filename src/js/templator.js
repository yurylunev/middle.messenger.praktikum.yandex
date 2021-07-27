'use strict';

(function () {
    class Templator {
        constructor(template) {
            this._template = template;
        }

        _uuid() {
            return Math.random().toString().split('.')[1].slice(0,8)
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
                } else
                    return defaultValue; //TODO Does not work!
            }
            return f(obj);
        }

        compile(ctx) {
            const replaces = Array.from(this._template.matchAll(/{{(.*?)}}/ig));
            return replaces.reduce((template, rulesMap) => {
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

    window.Templator = Templator;
})();