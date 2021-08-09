import Block from "../../utils/block";

class ForeignImage extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
            <div class="message">
                <div class="foreign-message foreign-message_image">
                    <img src="/static/images/{{imageURL}}" alt="">
                    <div class="time">
                        {{timeMessage}}
                    </div>
                </div>
            </div>
`;
    }
}

export default ForeignImage;