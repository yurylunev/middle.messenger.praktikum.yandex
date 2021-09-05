import './avatar.pcss';

export default `
<div class="avatar-wrapper">
    <label for="{{name}}">
        <img src="/static/images/{{avatarUrl}}">
    </label>
    <input type="file" id="{{name}}" name="{{name}}" class="invisible position-absolute">
</div>`;
