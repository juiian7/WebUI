import Base from "../Base.js";

export function input(value: string = "") {
    return new Input().set(value);
}

export default class Input extends Base<HTMLInputElement> {
    public get value(): string {
        //@ts-ignore
        return this._htmlElement.value;
    }

    public set value(v: string) {
        //@ts-ignore
        this._htmlElement.value = v;
    }

    constructor() {
        super("input");
    }

    public set(value: string) {
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

    public select() {
        //@ts-ignore
        this._htmlElement.select();
    }
}
