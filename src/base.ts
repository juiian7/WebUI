import { update } from "./dynamic.js";

export type Elem = Base<HTMLElement> | Node | string;

interface Event {
    type: keyof HTMLElementEventMap;
    handler: (this: HTMLElement, ev: Event) => void;
}

export default abstract class Base<T extends HTMLElement> {
    private _htmlElement: T;
    private _htmlType: string;
    protected _children: Elem[] = [];

    protected get _style(): CSSStyleDeclaration {
        return this._htmlElement.style;
    }

    // protected _events: Event[];

    constructor(htmlType: string, ...children: Elem[]) {
        this._htmlType = htmlType;

        this._htmlElement = document.createElement(this._htmlType) as T;

        this.append(...children);
    }

    public append(...children: Elem[]) {
        this._children.push(...children);

        this.render();
    }

    private render() {
        // append children
        this._htmlElement.innerHTML = "";
        this._children.forEach((e: Elem) => {
            if (e instanceof Base) {
                this._htmlElement.append(e.HTML);
            } else if (e instanceof Node || typeof e === "string") {
                this._htmlElement.append(e);
            }
        });
    }

    get HTML(): T {
        return this._htmlElement;
    }

    color(color: string) {
        this._style.color = color;
        return this;
    }

    width(width: string) {
        this._style.width = width;
        return this;
    }

    on(type: keyof HTMLElementEventMap, handler: (this: Base<T>, ev: Event) => void) {
        this._htmlElement.addEventListener(type, (ev) => {
            handler.bind(this)(ev);
            update();
        });
        return this;
    }
}
