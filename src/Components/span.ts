import Base, { Elem } from "../base.js";

export function span(texContent: string, ...params: Elem[]) {
    return new Span(texContent, ...params);
}

class Span extends Base<HTMLSpanElement> {
    constructor(texContent: string, ...params: Elem[]) {
        super("span", texContent, ...params);
    }

    get textContent() {
        return this.HTML.textContent;
    }

    set textContent(value: string) {
        if (this._children[0]) this._children[0] = value;
        else this._children = [value];
    }
}
