import Base, { Elem } from "../base.js";

export function element<T extends HTMLElement>(tagname: keyof HTMLElementTagNameMap, ...children: Elem[]) {
    return new Element<T>(tagname, ...children);
}

export function wrap<T extends HTMLElement>(element: T) {
    return new Element<T>(element);
}

export default class Element<T extends HTMLElement> extends Base<T> {}
