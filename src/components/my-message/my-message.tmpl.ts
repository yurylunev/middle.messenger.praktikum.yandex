import './my-message.pcss';

export default `
<div class="message">
    <div class="my-message">
        <div>{{textMessage}}</div>
        <div class="time">
            <img src="/static/images/msg-status-{{statusMessage}}.svg">
            {{timeMessage}}
        </div>
    </div>
</div>`;
