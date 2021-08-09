import Block from "../../utils/block";

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

export default ControlsButton;
