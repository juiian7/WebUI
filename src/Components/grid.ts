import Base, { Elem } from "../base.js";

export function grid(...params: Elem[]) {
    return new Grid(...params);
}

export class Grid extends Base<HTMLDivElement> {
    constructor(...params: Elem[]) {
        super("div", ...params);
        this._style.display = "grid";
    }

    public columns(columnList: string) {
        this._style.gridTemplateColumns = columnList;
        return this;
    }

    public justifyContent(justifyContent: string) {
        this._style.justifyContent = justifyContent;
        return this;
    }
    public alignContent(alignContent: string) {
        this._style.alignContent = alignContent;
        return this;
    }
    public gap(gap: string) {
        this._style.gap = gap;
        return this;
    }
}
