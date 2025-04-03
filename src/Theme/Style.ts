import Base from "../base.js";
import { element, wrap } from "../Components/Element.js";
import Rules from "./Rules.js";

const variables = {
    "text-color": "#111",
    surface: "#eee",
    font: "helvetica",
};

function v(name: string) {
    return variables[name];
}

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

        this.on("load", this.apply.bind(this));
    }

    private queue: string[] = [];
    insertRule(selector: string, ...rules: Rules[]) {
        let rule = rules.map((r) => r.toCSS()).join();
        let css = `${selector}{${rule}}`;
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

const presets = {
    default: style()
        .insertRule(
            "body",
            new Rules() //
                .rule("color", v("text-color"))
                .rule("backgroundColor", v("surface"))
                .rule("fontFamily", v("font"))
        )
        .insertRule("input", new Rules().rule("fontSize", "1rem")),
};
