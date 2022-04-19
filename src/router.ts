import { h1 } from "./Components/h1.js";
import Base, { Elem } from "./base.js";

type RouterElementBuilder = (params: { [name: string]: string }, vars: { [name: string]: string }) => Elem;

interface RouterMatch {
    path: string;
    page: Elem | RouterElementBuilder;
    vars: { [key: string]: string };
    params: { [key: string]: string };
}

class Router {
    private pages: { [path: string]: Elem | RouterElementBuilder } = {};

    constructor() {
        this.pages["404"] = h1("There is no such page :(");

        window.addEventListener("popstate", this.onPop.bind(this));
    }

    private onPop(e: PopStateEvent) {
        this.redirect(window.location.pathname, true);
    }

    public on(path: string, content: Elem | RouterElementBuilder): Router {
        this.pages[this.getPath(path)] = content;
        return this;
    }

    public redirect(path: string, silentHistory: boolean = false): Router {
        let match = this.getMatch(path);

        console.info("Redirecting...", match);

        if (!match) {
            this.redirect("404", true);
            return this;
        }

        if (match.page instanceof Function || typeof match.page == "function") {
            match.page = match.page(match.params, match.vars);
        }

        // clear and append new content
        document.body.innerHTML = "";
        if (match.page instanceof Base) {
            document.body.append(match.page.HTML);
        } else if (match.page instanceof Node || typeof match.page === "string") {
            document.body.append(match.page);
        }

        if (!silentHistory) window.history.pushState({}, "", path);

        return this;
    }

    private getMatch(path): RouterMatch {
        let p = this.getPath(path);

        // get parameters
        let params = {};
        if (path.includes("?")) {
            for (const keyval of path.split("?")[1].split("&")) {
                let t = keyval.split("=");
                params[t[0]] = t[1] ?? null;
            }
        }

        // does path exist
        if (this.pages[p]) {
            return {
                page: this.pages[p],
                params: params,
                path: path,
                vars: {},
            };
        }

        // contains path vars
        let masks = Object.keys(this.pages).filter((path) => path.includes(":"));
        for (const mask of masks) {
            let dirs = p.split("/");
            let mdirs = mask.split("/");

            if (dirs.length != mdirs.length) continue;

            let isSame = true;
            let vars = {};

            for (let i = 0; i < dirs.length; i++) {
                if (mdirs[i].startsWith(":")) {
                    vars[mdirs[i].substring(1)] = dirs[i];
                    continue;
                }

                if (dirs[i] != mdirs[i]) {
                    isSame = false;
                    break;
                }
            }

            if (isSame) {
                return {
                    page: this.pages[mask],
                    params: params,
                    path: path,
                    vars: vars,
                };
            }
        }

        // no match
        return null;
    }

    private getPath(path: string): string {
        if (path.includes("?")) path = path.split("?")[0];

        if (path.endsWith("/")) path = path.substring(0, path.length - 1);

        // if "/"
        if (path.length == 0) path = "/";

        return path;
    }

    public sync(): Router {
        this.redirect(window.location.pathname + window.location.search, true);
        return this;
    }
}

const pageRouter = new Router();
var isEnabled = false;

export function useRouter(state: boolean = true) {
    isEnabled = state;

    return router();
}

export function router(): Router {
    return isEnabled ? pageRouter : null;
}
