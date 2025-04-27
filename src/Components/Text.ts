import Base, { Elem } from "../Base.js";

export function text(texContent: string, ...params: Elem[]) {
    return new Text("span", texContent, ...params);
}

export function span(texContent: string, ...params: Elem[]) {
    return new Text("span", texContent, ...params);
}

export function p(textContent: string, ...params: Elem[]): Base<HTMLParagraphElement> {
    return new Text("p", textContent, ...params);
}

export function heading(textContent: string, size: 1 | 2 | 3 | 4 | 5 | 6 = 1, ...params: Elem[]) {
    return new Text(("h" + size) as keyof HTMLElementTagNameMap, textContent, ...params);
}

export function h1(textContent: string, ...params: Elem[]) {
    return new Text("h1", textContent, ...params);
}

export function h2(textContent: string, ...params: Elem[]) {
    return new Text("h2", textContent, ...params);
}

export function h3(textContent: string, ...params: Elem[]) {
    return new Text("h3", textContent, ...params);
}

export default class Text<T extends HTMLElement> extends Base<T> {
    constructor(tag: keyof HTMLElementTagNameMap, texContent: string, ...params: Elem[]) {
        super(tag, texContent, ...params);
    }

    public bold() {
        return this.style("fontWeight", "bold");
    }

    public italic() {
        return this.style("fontStyle", "italic");
    }
}
