import Base, { Elem } from "../base.js";

export function h1(textContent: string, ...params: Elem[]): Base<HTMLHeadingElement> {
    return new H1(textContent, ...params);
}

class H1 extends Base<HTMLHeadingElement> {
    constructor(textContent: string, ...params: Elem[]) {
        super("h1", textContent, ...params);
    }
}
