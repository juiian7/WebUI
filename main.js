import { button, div, h1, h2, span, p, dynamic, theme } from "./dist/index.js";

const rootTheme = theme().color("#efefef").background("#030303");

/*const buttonTheme = rootTheme
    .clone()
    .border("solid", "1px", "#fff")
    .borderRadius("5px")
    .hover((t) => t.color("#fff").background("#000"));
*/

let counter = 0;

let rootDiv = div(
    h1("Hoi!"),
    h2("Hoi2!"),

    span("Red text here :)"), //.color("red"),

    p("This is a paragraph.").on("dblclick", () => alert("Hello Universe")),

    dynamic(
        () => p(`Counter: ${counter}`),
        () => [counter]
    ),

    button("Click me!").on("click", function () {
        console.log(this);
        //this.color("blue");

        counter++;
    }),
    //.apply(buttonTheme),

    button("Reset").on("click", () => window.confirm("You sure?") && (counter = 0))
    //.apply(buttonTheme)
).applyTheme(rootTheme);

document.body.append(rootDiv.HTML);

rootTheme.applyOn(document.body);
