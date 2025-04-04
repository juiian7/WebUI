import { div, h1, span, p } from "../../dist/index.js";

document.body.append(
    div(
        h1("Hello World!"), 
        p("This is a simple ", span("demo").color("red").bold(), " page!")
    ).HTML
);
