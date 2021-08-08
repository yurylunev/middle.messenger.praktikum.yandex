import EventBus from "./event-bus";
import Templator from "./templator";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element = null;
    _meta = null;
    protected props: object;
    private eventBus: () => EventBus;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const {tagName = `div`} = this._meta;
        this._element = this._createContainerElement(tagName);
    }

    _addEvents() {
        // @ts-ignore
        const {events = {}} = this.props;
        Object.keys(events).forEach((selector) =>
            Object.keys(events[selector]).forEach((eventName) =>
                this._element.querySelectorAll(selector).forEach((element) =>
                    element.addEventListener(eventName, events[selector][eventName])))
        );
    }

    _removeEvents() {
        // @ts-ignore
        const {events = {}} = this.props;
        Object.keys(events).forEach((selector) =>
            Object.keys(events[selector]).forEach((eventName) =>
                this._element.querySelectorAll(selector).forEach((element) =>
                    element.removeEventListener(eventName, events[selector][eventName])))
        );
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount(this.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps) {
    }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._removeEvents();
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = (nextProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const renderedElements = Array.from(new Templator(this.render().trim()).compile(this.props));
        this._element.replaceChildren(...renderedElements);
        this._addEvents();
    }

    render(): string {
        return
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty(target, prop) {
                throw Error('Нет доступа');
            }
        });
    }

    _createContainerElement(tagName) {
        return document.createDocumentFragment();
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

export default Block;
