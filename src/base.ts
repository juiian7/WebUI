import Rules from "./Theme/Rules.js";
import { theme } from "./Theme/Theme.js";

import { update } from "./dynamic.js";

export type Elem<T extends HTMLElement = HTMLElement> = Base<T> | Node | string;

export default abstract class Base<T extends HTMLElement> {
    private _htmlElement: T;
    private _htmlType: keyof HTMLElementTagNameMap;
    protected _children: Elem[] = [];

    protected _style: Rules = new Rules();

    public get textContent() {
        return this._htmlElement.textContent;
    }

    public set textContent(value: string) {
        this._htmlElement.textContent = value;
    }

    // protected _events: Event[];

    constructor(element: T, ...children: Elem[]);
    constructor(htmlType: keyof HTMLElementTagNameMap, ...children: Elem[]);
    constructor(...args: any[]) {
        if (typeof args[0] === "string") {
            this._htmlType = args[0] as keyof HTMLElementTagNameMap;
            this._htmlElement = document.createElement(this._htmlType) as T;
        } else {
            this._htmlElement = args[0] as T;
            this._htmlType = this._htmlElement.tagName as any;
        }

        this.append(...(args.slice(1) as any[]));
    }

    public append(...children: Elem[]) {
        children = children.filter((e) => (e as any) !== false);
        this._children.push(...children);

        children.forEach((e: Elem) => {
            if (e instanceof Base) this._htmlElement.append(e._htmlElement);
            else if (e instanceof Node || typeof e === "string") this._htmlElement.append(e);
        });
    }

    public replace(other: Elem) {
        if (other instanceof Base) {
            this._htmlElement.replaceWith(other._htmlElement);
        } else if (other instanceof Node || typeof other === "string") {
            this._htmlElement.replaceWith(other);
        }
    }

    public text(text: string) {
        this.textContent = text;
    }

    public color(color: string) {
        this.style("color", color);
        return this;
    }

    public class(...classes: string[]) {
        this._htmlElement.classList.add(...classes);
        return this;
    }

    public align(type: "left" | "right" | "center") {
        this.style("textAlign", type);
        return this;
    }

    public margin(margin: string) {
        this.style("margin", margin);
        return this;
    }

    public padding(padding: string) {
        this.style("padding", padding);
        return this;
    }

    public on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void) {
        this._htmlElement.addEventListener(type, (ev) => {
            listener.bind(this)(ev);
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

    public getAttribute(name: string) {
        return this._htmlElement.getAttribute(name);
    }

    public style(name: keyof CSSStyleDeclaration, value: string) {
        this._style.rule(name, value);
        this._style.apply(this._htmlElement);
        return this;
    }

    public focus() {
        this._htmlElement.focus();
        return this;
    }

    public blur() {
        this._htmlElement.blur();
        return this;
    }

    public theme(preset: string) {
        let t = theme(preset);
        for (const name of t.keys()) this._htmlElement.style.setProperty("--" + name, t.get(name));
        return this;
    }
}
