import Block from "../utils/block";

class ErrorPage extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="error">
    <div class="status-code-{{statusCode}}">{{statusCode}}</div>
    <div class="status-text">{{statusText}}</div>
    <div class="back-text">Назад к чатам</div>
</div>
`;
    }
}

export {ErrorPage};
