import Block from "../../utils/block";

class ForeignMessage extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        return `
            <div class="message">
                <div class="foreign-message">
                    <div>{{textMessage}}</div>
                    <div class="time">{{timeMessage}}</div>
                </div>
            </div>
`;
    }
}

export default ForeignMessage;