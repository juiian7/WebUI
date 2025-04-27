import Base, { Elem } from "../Base.js";

export function form(...params: Elem[]) {
    return new Form(...params);
}

export default class Form extends Base<HTMLFormElement> {
    private _preventDefault = false;
    constructor(...params: Elem[]) {
        super("form", ...params);
    }

    public action(action: string) {
        this.attribute("action", action);
        return this;
    }

    public method(method: string) {
        this.attribute("method", method);
        return this;
    }

    public noDefault() {
        this.on("submit", (e) => e.preventDefault());
        return this;
    }
}
