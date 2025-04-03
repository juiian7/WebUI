import Base, { Elem } from "../base.js";

import { Text } from "./text.js";

export function p(textContent: string, ...params: Elem[]): Base<HTMLParagraphElement> {
    return new P(textContent, ...params);
}

class P extends Text<HTMLParagraphElement> {
    constructor(textContent: string, ...params: Elem[]) {
        super("p", textContent, ...params);
    }
}
