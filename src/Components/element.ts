import Base, { Elem } from "../base.js";

export function element<T extends HTMLElement>(tagname: string, ...children: Elem[]) {
    return new GenericElement<T>(tagname, ...children);
}

class GenericElement<T extends HTMLElement> extends Base<T> {
    constructor(tagname: string, ...children: Elem[]) {
        super(tagname, ...children);
    }
}
