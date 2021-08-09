import Block from "../../utils/block";

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

export default ControlField;
