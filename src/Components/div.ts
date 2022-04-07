import Base, { Elem } from "../base.js";

export function div(...params: Elem[]) {
    return new Div(...params);
}

class Div extends Base<HTMLDivElement> {
    constructor(...params: Elem[]) {
        super("div", ...params);
    }
}
