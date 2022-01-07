import './foreign-image.pcss';

export default `
<div class="message">
    <div class="foreign-message foreign-message_image">
        <img src="/static/images/{{imageURL}}">
        <div class="time">
            {{timeMessage}}
        </div>
    </div>
</div>`;
