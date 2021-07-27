const loginWindowTemplate = () => `
<div class="login-window">
    <div class="login-window_header">
        <h2>{{headerText}}</h2>
    </div>
    {{inputFields}}
    <div class="buttons-wrapper">
        <button class="entry">{{entryButtonText}}</button>
        <button class="noEntry">{{noEntryButtonText}}</button>
    </div>
</div>
`;

const inputFieldsTemplate = () => `
<div class="login-window_input-field">
        <div class="input-field">
            <label for="{{name}}">{{label}}</label>
            <input type="{{type}}" placeholder="{{label}}" id="{{name}}" name="{{name}}"/>
        </div>
        <div class="error-message">{{errorMessage}}</div>
</div>
`;

window.loginWindowTemplate = (loginWindowTemplate)().trim();

window.inputFieldsTemplate = (inputFieldsTemplate)().trim();