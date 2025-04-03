import Base, { Elem } from "../base.js";
import { Text } from "./text.js";

export function h1(textContent: string, ...params: Elem[]): Base<HTMLHeadingElement> {
    return new H1(textContent, ...params);
}

class H1 extends Text<HTMLHeadingElement> {
    constructor(textContent: string, ...params: Elem[]) {
        super("h1", textContent, ...params);
    }
}
