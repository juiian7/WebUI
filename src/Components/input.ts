import Base from "../base.js";

export function input(value: string = "") {
    return new Input().value(value);
}

class Input extends Base<HTMLInputElement> {
    public get val(): string {
        return this.getAttribute("value");
    }

    public set val(v: string) {
        this.value(v);
    }

    constructor() {
        super("input");
    }

    public value(value: string) {
        this.attribute("value", value);
        return this;
    }

    public placeholder(placeholder: string) {
        this.attribute("placeholder", placeholder);
        return this;
    }

    public type(type: string) {
        this.attribute("type", type);
        return this;
    }
}
