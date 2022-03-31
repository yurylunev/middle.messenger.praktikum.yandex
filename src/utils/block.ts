import EventBus from './event-bus';
import Templator from './templator';


interface BlockMeta<P = any> {
  props: P;
  tagName: string;
}

type Nullable<T> = T | null;
type Keys<T extends Record<string, unknown>> = keyof T;
type Values<T extends Record<string, unknown>> = T[Keys<T>];
type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element: Nullable<DocumentFragment | HTMLElement> = null;
  _meta: BlockMeta = {tagName: 'div', props: {}};
  protected props: ProxyHandler<object> = {};
  protected eventBus: () => EventBus<Events>;
  protected state: any = {};

  constructor(props?: P) {
    const eventBus = new EventBus<Events>();
    if (props) {
      this._meta = Object.assign(this._meta, {props});
    }
    this.props = this._makePropsProxy(this._meta.props);
    this.state = this._makePropsProxy(this.state);

    this.getStateFromProps();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(tagName?: string) {
    this._element = this._createContainerElement(tagName);
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events || {};
    Object.keys(events).forEach((selector) =>
      Object.keys(events[selector]).forEach((eventName: string) =>
        this._element!.querySelectorAll(selector).forEach((element) =>
          // @ts-ignore
          element.addEventListener(eventName, events[selector as string][eventName]))),
    );
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events || {};
    Object.keys(events).forEach((selector) =>
      Object.keys(events[selector]).forEach((eventName) =>
        this._element!.querySelectorAll(selector).forEach((element) =>
          // @ts-ignore
          element.removeEventListener(eventName, events[selector][eventName]))),
    );
  }

  // @ts-ignore
  protected getStateFromProps(props: P = {}): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  async _componentDidMount(props: P) {
    this.componentDidMount(props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // @ts-ignore
  componentDidMount(props?: P) {
    return;
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    // @ts-ignore
    // TODO Too much stranger
    this.props.router.currentPage.render();
  }

  // @ts-ignore
  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }
    Object.assign(this.state, nextState);
  };

  get element(): Nullable<DocumentFragment | HTMLElement> {
    return this._element;
  }

  _render() {
    this._removeEvents();
    const fragments = new Templator(this.render().trim()).compile(this.props);
    Array.from(fragments).forEach((element) => this._element!.appendChild(element));
    this._addEvents();
    this.render();
  }

  render(): string {
    return '';
  }

  getContent(): Nullable<DocumentFragment | HTMLElement> {
    return this.element;
  }

  _makePropsProxy(props: any): ProxyHandler<any> {
    // const self = this;
    if (props) {
      return new Proxy(props, {
        get(target: Record<string, unknown>, prop: string) {
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        },
        set(target: Record<string, unknown>, prop: string, value: any) {
          target[prop] = value;
          // self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
          return true;
        },
      }) as P;
    } else {
      return props;
    }
  }

  _createContainerElement(tagName?: string) {
    if (tagName) {
      return document.createElement(tagName);
    }
    return document.createDocumentFragment();
  }
}
