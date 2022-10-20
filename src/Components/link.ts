import Base, { Elem } from "../base.js";
import { router } from "../router.js";

export function link(texContent: string, url: string, ...params: Elem[]) {
    return new Link(texContent, url, ...params);
}

class Link extends Base<HTMLLinkElement> {
    constructor(texContent: string, url: string, ...params: Elem[]) {
        super("a", texContent, ...params);
        this.href = url;

        this.on("click", this.onClick.bind(this));
    }

    private onClick(ev: Event) {
        let url = new URL(this.href);

        if (url.origin != window.origin) return;

        if (router()) {
            router().redirect(url.pathname + url.search);
            ev.preventDefault();
        }
    }

    public get href() {
        return this.HTML.href;
    }

    public set href(value: string) {
        this.HTML.href = value;
    }

    public get textContent() {
        return this.HTML.textContent;
    }

    public set textContent(value: string) {
        if (this._children[0]) this._children[0] = value;
        else this._children = [value];
    }
}
