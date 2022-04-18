import './inputs.pcss';

export default `
<div class="input-field">
    <label for="{{name}}">{{label}}</label>
    <input type="{{type}}" id="{{name}}" placeholder="{{label}}" name="{{name}}" value="{{value}}">
</div>`;
