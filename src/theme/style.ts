export class Style {
    public rules: any = {};

    constructor() {}

    public setRule(name: keyof CSSStyleDeclaration, value: string) {
        this.rules[name] = value;
        return this;
    }

    public clone(): Style {
        let style = new Style();
        for (const name in this.rules) {
            style.rules[name] = this.rules[name];
        }
        return style;
    }
}
