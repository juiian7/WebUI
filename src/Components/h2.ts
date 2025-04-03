import Base, { Elem } from "../base.js";
import { Text } from "./text.js";

export function h2(textContent: string, ...params: Elem[]) {
    return new H2(textContent, ...params);
}

class H2 extends Text<HTMLHeadingElement> {
    constructor(textContent: string, ...params: Elem[]) {
        super("h2", textContent, ...params);
    }
}
