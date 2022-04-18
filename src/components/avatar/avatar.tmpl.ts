import './avatar.pcss';

export default `
<div class="avatar-wrapper">
    <form name="avatar">
        <label for="{{name}}">
            <img src="{{avatarUrl}}" alt="">
        </label>
        <input type="file" id="{{name}}" name="{{name}}" class="invisible position-absolute">
    </form>
</div>`;
