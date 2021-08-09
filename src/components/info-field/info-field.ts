import Block from "../../utils/block";

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

export default InfoField;
