export default class Rules {
    private rules: Partial<CSSStyleDeclaration> = {};

    public rule<T extends keyof CSSStyleDeclaration>(name: T, value: CSSStyleDeclaration[T]): Rules {
        this.rules[name] = value;
        return this;
    }

    public apply(element: HTMLElement) {
        for (const name in this.rules) {
            element.style[name] = this.rules[name]!;
        }
    }

    toCSS(): string {
        let css: string[] = [];
        for (const name in this.rules) css.push(`${camelToKebab(name)}: ${this.rules[name]};`);
        return css.join("\n");
    }
}

function camelToKebab(camelCase) {
    return camelCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
