import Block from "./block";

class ErrorPage extends Block {
    constructor(props) {
        super(undefined, props);
        this.props = props;
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
