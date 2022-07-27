import Base, { Elem } from "../base.js";

export function list(list: Elem[]) {
    return new List(list);
}

class List extends Base<HTMLDivElement> {
    constructor(list: Elem[]) {
        super("div", ...list);
    }
}
