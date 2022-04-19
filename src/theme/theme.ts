import { Style } from "./style.js";
import { initPresets, preset } from "./presets.js";

export function theme() {
    return new Theme();
}

export class Theme {
    private _styles: { [type: string]: Style };

    constructor() {
        this._styles = { basis: new Style() };
    }

    public clone() {
        let theme = new Theme();
        for (const type in this._styles) {
            theme._styles[type] = this._styles[type].clone();
        }

        return theme;
    }

    public setRule(name: keyof CSSStyleDeclaration, value: string, target: keyof HTMLElementTagNameMap | "basis" = "basis") {
        if (!this._styles[target]) this._styles[target.toLocaleLowerCase()] = new Style();

        this._styles[target].setRule(name, value);
        return this;
    }

    public color(value: string) {
        this.setRule("color", value);
        return this;
    }

    public background(value: string) {
        this.setRule("backgroundColor", value);
        return this;
    }

    public applyOn(element: HTMLElement, overwrite: boolean = true) {
        for (const name in this._styles["basis"].rules) {
            if (overwrite || !element.style[name]) element.style[name] = this._styles["basis"].rules[name];
        }

        let type = element.tagName.toLocaleLowerCase();

        if (Object.keys(this._styles).includes(type)) {
            for (const name in this._styles[type].rules) {
                element.style[name] = this._styles[type].rules[name];
            }
        }
    }

    public on(type: keyof CSSStyleDeclaration, handler: (ev: Event) => Theme) {
        //TODO: on event -> execute handler to get Theme -> applyOn element
        return this;
    }
}

export var onPageThemeChangeCallbacks: Function[] = [];

function updatePageThemeElements(newTheme: Theme) {
    for (let i = 0; i < onPageThemeChangeCallbacks.length; i++) {
        onPageThemeChangeCallbacks[i](newTheme);
    }
}

initPresets();

export var prefers_dark_theme = window.matchMedia("(prefers-color-scheme: dark)").matches;

var pageTheme = preset("default");
var usesDefault = true;
pageTheme.applyOn(document.body);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    prefers_dark_theme = e.matches;

    if (usesDefault) {
        setPageTheme(null);
    }
});

export function setPageTheme(theme: Theme) {
    if (!theme) {
        theme = preset("default");
        usesDefault = true;
    } else usesDefault = false;

    let newPageTheme = theme;
    updatePageThemeElements(newPageTheme);
    pageTheme = newPageTheme;

    pageTheme.applyOn(document.body);
}

export function getPageTheme(): Theme {
    return pageTheme;
}
