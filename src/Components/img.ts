import Base from "../base.js";

export function img(src: string) {
    return new Img(src);
}

class Img extends Base<HTMLImageElement> {
    constructor(src: string) {
        super("img");
        this.src(src);
    }

    public src(src: string) {
        this.HTML.src = src;
        return this;
    }

    public alt(alt: string) {
        this.HTML.alt = alt;
        return this;
    }

    public width(width: string) {
        this.HTML.style.width = width;
        return this;
    }

    public height(height: string) {
        this.HTML.style.height = height;
        return this;
    }
}
