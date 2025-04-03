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
        this.attribute("src", src);
        return this;
    }

    public alt(alt: string) {
        this.attribute("alt", alt);
        return this;
    }

    public width(width: string) {
        this.style("width", width);
        return this;
    }

    public height(height: string) {
        this.style("height", height);
        return this;
    }
}
