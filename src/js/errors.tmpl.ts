const errorPageTemplate = `
<div class="error">
    <div class="status-code-{{statusCode}}">{{statusCode}}</div>
    <div class="status-text">{{statusText}}</div>
    <div class="back-text">Назад к чатам</div>
</div>
`.trim();

export {errorPageTemplate};
