import Base from "../Base.js";
import { element, wrap } from "../Components/Element.js";
import Rules from "./Rules.js";
import { theme } from "./Theme.js";

export function style(preset?: keyof typeof presets): Style {
    if (preset === undefined) return new Style();
    if (presets[preset]) return presets[preset];

    throw new Error("Preset not defined");
}

export function includeExternalStyleSheet(path: string) {
    wrap(document.head).append(element("link").attribute("rel", "stylesheet").attribute("href", path));
}

export default class Style extends Base<HTMLStyleElement> {
    constructor() {
        super("style");
        this.attribute("type", "text/css");

        this.theme("default");
        this.on("load", this.apply.bind(this));
    }

    private queue: string[] = [];
    public insertRule(selector: string, ...rules: Rules[]) {
        let rule = rules.map((r) => r.toCSS()).join();
        let css = `${selector}{${rule}}`;
        //@ts-ignore
        let sheet: CSSStyleSheet = this._htmlElement.sheet;
        if (sheet) sheet.insertRule(css);
        else this.queue.push(css);
        return this;
    }

    public theme(preset: string) {
        let css = `:root{${theme(preset).toCSS()}}`;
        //@ts-ignore
        let sheet: CSSStyleSheet = this._htmlElement.sheet;
        if (sheet) sheet.insertRule(css);
        else this.queue.push(css);
        return this;
    }

    private apply() {
        let css;
        //@ts-ignore
        while ((css = this.queue.pop())) this._htmlElement.sheet.insertRule(css);
    }
}

function v(name: string) {
    return `var(--${name})`;
}

const presets = {
    default: style()
        .insertRule(
            "body,h1,h2,h3,div,span,input",
            new Rules() //
                .rule("color", v("c-text"))
                .rule("backgroundColor", v("c-surface"))
                .rule("fontFamily", v("f-family"))
        )
        .insertRule("input", new Rules().rule("fontSize", v("f-size"))),
};
