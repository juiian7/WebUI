import { update } from "./dynamic.js";
import { getPageTheme, onPageThemeChangeCallbacks, Theme } from "./theme/theme.js";

export type Elem = Base<HTMLElement> | Node | string;

interface Event {
    type: keyof HTMLElementEventMap;
    handler: (this: HTMLElement, ev: Event) => void;
}

export default abstract class Base<T extends HTMLElement> {
    private _htmlElement: T;
    private _htmlType: string;

    private _pageTheme: Theme = null;
    private _theme: Theme = null;

    protected _children: Elem[] = [];

    protected get _style(): CSSStyleDeclaration {
        return this._htmlElement.style;
    }

    // protected _events: Event[];

    constructor(htmlType: string, ...children: Elem[]) {
        this._htmlType = htmlType;
        this._htmlElement = document.createElement(this._htmlType) as T;

        this.append(...children);

        this._pageTheme = getPageTheme();
        onPageThemeChangeCallbacks.push(this.onPageThemeChange.bind(this));

        this.applyTheme(this._theme);
    }

    private onPageThemeChange(newPageTheme: Theme) {
        this._pageTheme = newPageTheme;

        this.applyTheme(this._theme);
    }

    public append(...children: Elem[]) {
        this._children.push(...children);

        this.render();
    }

    private render() {
        // append children
        this._htmlElement.innerHTML = "";
        this._children.forEach((e: Elem) => {
            if (e instanceof Base) {
                this._htmlElement.append(e.HTML);
            } else if (e instanceof Node || typeof e === "string") {
                this._htmlElement.append(e);
            }
        });
    }

    get HTML(): T {
        return this._htmlElement;
    }

    color(color: string) {
        this._style.color = color;
        return this;
    }

    on(type: keyof HTMLElementEventMap, handler: (this: Base<T>, ev: Event) => void) {
        this._htmlElement.addEventListener(type, (ev) => {
            handler.bind(this)(ev);
            update();
        });
        return this;
    }

    public applyTheme(theme: Theme = null, includeChildren: boolean = true, overwrite: boolean = false) {
        this._theme = theme;

        this._pageTheme.applyOn(this._htmlElement, false);
        if (this._theme) this._theme.applyOn(this._htmlElement, overwrite);

        if (includeChildren) {
            this._children.forEach((e: Elem) => {
                if (e instanceof Base) {
                    e.applyTheme(theme, true, overwrite);
                } else if (e instanceof Node) {
                    this._pageTheme.applyOn(e.parentElement, false);
                    if (this._theme) this._theme.applyOn(e.parentElement, overwrite);
                }
            });
        }

        return this;
    }
}
