import { update } from "./dynamic.js";

export type Elem = Base<HTMLElement> | Node | string;

interface Event {
    type: keyof HTMLElementEventMap;
    handler: (this: HTMLElement, ev: Event) => void;
}

export default abstract class Base<T extends HTMLElement> {
    private _htmlElement: T;
    private _htmlType: keyof HTMLElementTagNameMap;
    protected _children: Elem[] = [];

    protected get _style(): CSSStyleDeclaration {
        return this._htmlElement.style;
    }

    // protected _events: Event[];

    constructor(htmlType: keyof HTMLElementTagNameMap, ...children: Elem[]) {
        this._htmlType = htmlType;

        this._htmlElement = document.createElement(this._htmlType) as T;

        this.append(...children);
    }

    public append(...children: Elem[]) {
        children = children.filter((e) => (e as any) !== false);
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

    public get HTML(): T {
        return this._htmlElement;
    }

    public color(color: string) {
        this._style.color = color;
        return this;
    }

    public class(...classes: string[]) {
        this._htmlElement.classList.add(...classes);
        return this;
    }

    public align(type: "left" | "right" | "center") {
        this._style.textAlign = type;
        return this;
    }

    public margin(margin: string) {
        this._style.margin = margin;
        return this;
    }

    public padding(padding: string) {
        this._style.padding = padding;
        return this;
    }

    public on(type: keyof HTMLElementEventMap, handler: (this: Base<T>, ev: Event) => void) {
        this._htmlElement.addEventListener(type, (ev) => {
            handler.bind(this)(ev);
            update();
        });
        return this;
    }

    public id(id: string) {
        this._htmlElement.id = id;
        return this;
    }

    public attribute(name: string, value?: string) {
        this._htmlElement.setAttribute(name, value ?? "");
        return this;
    }

    public style(name: keyof CSSStyleDeclaration, value: string) {
        this._htmlElement.style[name as string] = value;
        return this;
    }
}
