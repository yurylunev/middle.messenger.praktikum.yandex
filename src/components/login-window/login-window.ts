import Block from "../../utils/block";

class LoginWindow extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="login-window">
    <div class="login-window_header">
        <h2>{{headerText}}</h2>
    </div>
    {{inputFields}}
    <div class="buttons-wrapper">
        <button class="entry">{{entryButtonText}}</button>
        <button class="noEntry">{{noEntryButtonText}}</button>
    </div>
</div>`
    }
}

export default LoginWindow;
