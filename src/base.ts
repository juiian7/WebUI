export type Elem = Base<HTMLElement> | Node | string;

interface Event {
    type: keyof HTMLElementEventMap;
    handler: (this: HTMLElement, ev: Event) => void;
}

export default abstract class Base<T extends HTMLElement> {
    private _htmlType: string;
    protected _children: Elem[];
    protected _style: CSSStyleDeclaration;
    protected _events: Event[];

    constructor(htmlType: string, ...children: Elem[]) {
        this._htmlType = htmlType;
        this._children = children;
        this._events = [];
        this._style = document.createElement(htmlType).style;
    }

    append(...children: Base<HTMLElement>[]) {
        this._children.push(...children);
    }

    get HTML(): T {
        let element = document.createElement(this._htmlType) as T;

        // apply styles
        element.style.color = this._style.color;

        // connect events
        this._events.forEach((event) => element.addEventListener(event.type, event.handler as any));

        // append children
        this._children.forEach((e: Elem) => {
            if (e instanceof Base) {
                element.append(e.HTML);
            } else if (e instanceof Node || typeof e === "string") {
                element.append(e);
            }
        });
        return element;
    }

    color(color: string) {
        this._style.color = color;
        return this;
    }

    width(width: string) {
        this._style.width = width;
        return this;
    }

    on(type: keyof HTMLElementEventMap, handler: (this: HTMLElement, ev: Event) => void) {
        this._events.push({ type, handler });
        return this;
    }
}
