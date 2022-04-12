import './avatar.pcss';

export default `
<div class="avatar-wrapper">
    <form name="avatar" enctype="multipart/form-data">
        <label for="{{name}}">
            <img src="{{avatarUrl}}">
        </label>
        <input type="file" id="{{name}}" name="{{name}}" class="invisible position-absolute">
    </form>
</div>`;
