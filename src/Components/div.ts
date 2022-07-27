import Base, { Elem } from "../base.js";

const vboxCSS = ".vbox>*{display:block;}";
const hboxCSS = ".hbox{display:flex;flex:direction:row;align-items:center;justify-content:space-evenly;}";

const style = document.createElement("style");
style.innerHTML = vboxCSS + hboxCSS;
document.getElementsByTagName("head")[0].append(style);

export function div(...params: Elem[]) {
    return new Div(...params);
}

export function hbox(...children: Elem[]) {
    return div(...children).class("hbox");
}

export function vbox(...children: Elem[]) {
    return div(...children).class("vbox");
}

class Div extends Base<HTMLDivElement> {
    constructor(...params: Elem[]) {
        super("div", ...params);
    }

    public width(w: string) {
        this._style.width = w;
        return this;
    }
}
