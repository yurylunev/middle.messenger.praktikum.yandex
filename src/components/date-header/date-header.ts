import Block from "../../utils/block";

class DateHeader extends Block {
    constructor(props: object) {
        super(undefined, props);
    }

    render(): string {
        console.log(`DateHeader`, this.props);
        return `
            <div class="message">
                <div class="date">
                    {{date}}
                </div>
            </div>
`;
    }
}

export default DateHeader;
