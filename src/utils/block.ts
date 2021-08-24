import EventBus from './event-bus';
import Templator from './templator';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: DocumentFragment;
  _meta = {tagName: {}, props: {}};
  protected props: object;
  private eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @return {void}
   */
  constructor(tagName: string = 'div', props: object = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createContainerElement();
  }

  _addEvents() {
    // @ts-ignore
    const {events = {}} = this.props;
    Object.keys(events).forEach((selector) =>
      Object.keys(events[selector]).forEach((eventName) =>
        this._element.querySelectorAll(selector).forEach((element) =>
          element.addEventListener(eventName, events[selector][eventName]))),
    );
  }

  _removeEvents() {
    // @ts-ignore
    const {events = {}} = this.props;
    Object.keys(events).forEach((selector) =>
      Object.keys(events[selector]).forEach((eventName) =>
        this._element.querySelectorAll(selector).forEach((element) =>
          // eslint-disable-next-line max-len
          element.removeEventListener(eventName, events[selector][eventName]))),
    );
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._removeEvents();
    this._render();
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    this.props = Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const renderedElements = Array.from(new Templator(this.render().trim()).compile(this.props));
    renderedElements.forEach((element) => this._element.appendChild(element));
    this._addEvents();
  }

  render(): string {
    return ``;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: object) {
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value: object | string = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
    });
  }

  _createContainerElement() {
    return document.createDocumentFragment();
  }
}

export default Block;
