import { div, h1, span, p, element, wrap, input, Comp, container, hsplit, button, vsplit, style } from "../../dist/index.js";
import Rules from "../../dist/Theme/Rules.js";

class CustomInput extends Comp.Input {
    constructor() {
        super();

        this.on("keydown", (ev) => {
            if (ev.code.includes("Key")) ev.preventDefault();
            if (ev.code == "Enter") this.apply();
        });

        this.on("blur", (ev) => {
            this.apply();
        });
    }

    apply() {
        this.value = eval(this.value);
    }
}

wrap(document.body).append(
    div(
        //
        h1("Hello World!"),
        p("This is a simple ", span("demo").color("red").bold(), " page!"),
        hsplit("test", button("Click")),

        new CustomInput().id("test")
    ),
    style("default")
);
