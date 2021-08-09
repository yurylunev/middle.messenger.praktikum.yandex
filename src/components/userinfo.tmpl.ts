import Block from "../utils/block";

class UserinfoPage extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="back-menu">
        <button class="back">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12.6" y="6.40005" width="10.2" height="0.8" transform="rotate(-180 12.6 6.40005)"
                      fill="#D1D2D3" stroke="#565856" stroke-width="0.8"/>
                <path d="M6 11L2 6L6 1" stroke="#565856" stroke-width="1.6"/>
            </svg>
        </button>
    </div>
    <div class="main-side">
        <div class="userinfo-area">
            {{avatar}}
            <div class="username-header">{{headerText}}</div>
            <div class="inputs {{style}}">
                {{inputs}}
            </div>
            <div class="controls">
                {{controls}}
            </div>
        </div>
    </div>
`;
    }
}

class Avatar extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="avatar-wrapper">
    <label for="avatar">
        <img id="avatar-preview" src="/static/images/{{avatarUrl}}">
    </label>
    <input type="file" id="avatar" name="avatar" class="invisible position-absolute">
</div>
`;
    }
}

class Inputs extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="input-field">
    <label for="{{name}}">{{label}}</label>
    <input type="{{type}}" id="{{name}}" name="{{name}}" value="{{value}}">
</div>
`;
    }
}

class InfoField extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="input-field">
    <label for="{{name}}">{{label}}</label>
    <div>{{value}}</div>
</div>
`;
    }
}

class ControlField extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
<div class="control-field">
    <button class="{{style}}">{{label}}</button>
</div>
`;
    }
}

class ControlsButton extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
    <button class="{{style}}">{{label}}</button>
`;
    }
}

export {
    Avatar,
    ControlsButton,
    ControlField,
    InfoField,
    Inputs,
    UserinfoPage
};
