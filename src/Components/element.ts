import Base, { Elem } from "../base.js";

export function element<T extends HTMLElement>(tagname: keyof HTMLElementTagNameMap, ...children: Elem[]) {
    return new GenericElement<T>(tagname, ...children);
}

class GenericElement<T extends HTMLElement> extends Base<T> {
    constructor(tagname: keyof HTMLElementTagNameMap, ...children: Elem[]) {
        super(tagname, ...children);
    }

    public attribte(name: string, value: string) {
        this.HTML[name] = value;
        return this;
    }
}
