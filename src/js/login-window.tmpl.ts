import Block from "./block";

class inputFields extends Block {
    constructor(props) {
        super(undefined, props);
        this.props = props;
    }

    render(): string {
        return `
<div class="login-window_input-field">
        <div class="input-field">
            <label for="{{name}}">{{label}}</label>
            <input type="{{type}}" placeholder="{{label}}" id="{{name}}" name="{{name}}"/>
        </div>
        <div class="error-message">{{errorMessage}}</div>
</div>`;
    }
}

class loginWindow extends Block {
    constructor(props) {
        super(undefined, props);
        this.props = props;
    }

    render(): string {
        return `
<div class="login-window">
    <div class="login-window_header">
        <h2>{{headerText}}</h2>
    </div>
    {{inputFields}}
    <div class="buttons-wrapper">
        <button class="entry">{{entryButtonText}}</button>
        <button class="noEntry">{{noEntryButtonText}}</button>
    </div>
</div>`
    }
}

export {inputFields, loginWindow};
