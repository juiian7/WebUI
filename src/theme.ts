export function theme() {
    return new Theme();
}

export function color() {
    return {
        red: "#ff0000",
    };
}

export class Theme {
    private _rules: any = {};

    constructor() {}

    public setRule(name: keyof CSSStyleDeclaration, value: string) {
        this._rules[name] = value;
        return this;
    }

    public clone() {
        let theme = new Theme();
        for (const name in this._rules) {
            theme.setRule(name as keyof CSSStyleDeclaration, this._rules[name]);
        }

        return theme;
    }

    public color(value: string) {
        this.setRule("color", value);
        return this;
    }

    public background(value: string) {
        this.setRule("backgroundColor", value);
        return this;
    }

    public applyOn(element: HTMLElement) {
        for (const name in this._rules) {
            element.style[name] = this._rules[name];
        }
    }

    public on(type: keyof CSSStyleDeclaration, handler: (ev: Event) => Theme) {
        //TODO: on event -> execute handler to get Theme -> applyOn element
        return this;
    }
}
