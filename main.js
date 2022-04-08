import { button, div, h1, h2, span, p, dynamic, update } from "./dist/index.js";

let counter = 0;

let rootDiv = div(
    h1("Hoi!"),
    h2("Hoi2!"),

    span("Red text here :)").color("red"),

    p("This is a paragraph.").on("dblclick", () => alert("Hello Universe")),

    dynamic(
        () => p(`Counter: ${counter}`),
        () => [counter]
    ),

    button("Click me!")
        .on("click", function () {
            console.log(this);
            this.color("blue");

            counter++;
        })
        .color("#44DD44"),

    button("Reset").on("click", () => window.confirm("You sure?") && (counter = 0))
);

document.body.append(rootDiv.HTML);
