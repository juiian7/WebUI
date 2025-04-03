import Base, { Elem } from "../base.js";

export function button(texContent: string) {
    return new Button(texContent);
}

class Button extends Base<HTMLButtonElement> {
    constructor(texContent: string) {
        super("button", texContent);
    }

    public type(type: "button" | "submit" | "reset") {
        this.attribute("type", type);
        return this;
    }

    public width(w: string) {
        this._style.width = w;
        return this;
    }
}
