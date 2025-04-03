import Base, { Elem } from "../base.js";

const vsplitCSS = ".vsplit>*{display:block;}";
const hsplitCSS = ".split,.hsplit{display:flex;align-items:center;justify-content:space-evenly;}";

const style = document.createElement("style");
style.innerHTML = vsplitCSS + hsplitCSS;
document.getElementsByTagName("head")[0].append(style);

export function div(...params: Elem[]) {
    return new Container(...params);
}

export function container(...params: Elem[]) {
    return new Container(...params);
}

export function hsplit(...children: Elem[]) {
    return div(...children).class("hsplit");
}

export function vsplit(...children: Elem[]) {
    return div(...children).class("vsplit");
}

export function grid(...params: Elem[]) {
    return new Grid(...params);
}

export default class Container extends Base<HTMLDivElement> {
    constructor(...params: Elem[]) {
        super("div", ...params);
    }

    public width(w: string) {
        this.style("width", w);
        return this;
    }
}

export class Grid extends Container {
    constructor(...params: Elem[]) {
        super("div", ...params);
        this.style("display", "grid");
    }

    public columns(columnList: string) {
        this.style("gridTemplateColumns", columnList);
        return this;
    }

    public justifyContent(justifyContent: string) {
        this.style("justifyContent", justifyContent);
        return this;
    }
    public alignContent(alignContent: string) {
        this.style("alignContent", alignContent);
        return this;
    }
    public gap(gap: string) {
        this.style("gap", gap);
        return this;
    }
}
