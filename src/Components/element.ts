import Base, { Elem } from "../base.js";

export function element<T extends HTMLElement>(tagname: keyof HTMLElementTagNameMap, ...children: Elem[]) {
    return new Element<T>(tagname, ...children);
}

export function wrap<T extends HTMLElement>(toWrap: T) {
    return new Element<T>(toWrap);
}

export default class Element<T extends HTMLElement> extends Base<T> {}
