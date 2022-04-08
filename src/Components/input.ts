import Base from "../base.js";

export function input(value: string = "") {
    return new Input().value(value);
}

class Input extends Base<HTMLInputElement> {
    constructor() {
        super("input");
    }

    public value(value: string) {
        this.HTML.value = value;
        return this;
    }

    public focus() {
        this.HTML.autofocus = true;
        return this;
    }
}
