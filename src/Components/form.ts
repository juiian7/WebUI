import Base, { Elem } from "../base.js";

export function form(...params: Elem[]) {
    return new Form(...params);
}

class Form extends Base<HTMLFormElement> {
    private _preventDefault = false;
    constructor(...params: Elem[]) {
        super("form", ...params);
    }

    public action(action: string) {
        this.HTML.action = action;
        return this;
    }

    public method(method: string) {
        this.HTML.method = method;
        return this;
    }

    public noDefault() {
        this.HTML.addEventListener("submit", (e) => e.preventDefault());
        return this;
    }
}
