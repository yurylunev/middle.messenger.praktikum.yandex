import Block from "../../utils/block";

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

export default Avatar;