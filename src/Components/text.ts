import Base, { Elem } from "../base.js";

export function text(texContent: string, ...params: Elem[]) {
    return new Span(texContent, ...params);
}

export function span(texContent: string, ...params: Elem[]) {
    return new Span(texContent, ...params);
}

export abstract class Text<T extends HTMLElement> extends Base<T> {
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

class Span extends Text<HTMLSpanElement> {
    constructor(content: string, ...params: Elem[]) {
        super("span", content, ...params);
    }
}
