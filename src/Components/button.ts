import Base, { Elem } from "../base.js";

export function button(texContent: string) {
    return new Button(texContent);
}

class Button extends Base<HTMLButtonElement> {
    constructor(texContent: string) {
        super("button", texContent);
    }
}
