export default class Theme {
    private vars: { [name: string]: string } = {};

    public set(name: string, v: string) {
        this.vars[name] = v;
        return this;
    }

    public setObj(vars: { [name: string]: string }) {
        this.vars = { ...vars };
        return this;
    }

    public get(name: string): string {
        return this.vars[name];
    }

    public keys() {
        return Object.keys(this.vars);
    }

    public toCSS(): string {
        let s = [];
        for (const key in this.vars) {
            s.push(`--${key}:${this.vars[key]};`);
        }
        return s.join("");
    }
}

const defaultVars = {
    "f-family": "helvetica",
    "f-size": "1rem",
    "c-text": "#000",
    "c-surface": "#fff",
    "c-surface-sunken": "#eee",
    "c-surface-raised": "#fff",
    "c-primary": "#123456",
};

const presets: { [name: string]: Theme } = {
    default: new Theme().setObj(defaultVars),
};

export function theme(name: string = "default") {
    if (!presets[name]) {
        console.info("Creating new theme!");
        presets[name] = new Theme();
    }
    return presets[name];
}
