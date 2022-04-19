import { button, div, h1, h2, span, p, dynamic, theme, preset, color, setPageTheme } from "./dist/index.js";

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

    button("Click me!").on("click", function () {
        console.log(this);
        //this.color("blue");

        counter++;
    }),

    button("Reset").on("click", () => window.confirm("You sure?") && (counter = 0))
); //.applyTheme(preset("light"), true, true);

document.body.append(rootDiv.HTML);

//setPageTheme(preset("blue").setRule("margin", "0px", "body"));

/*let i = 0;
let themes = ["light", "dark"];
setInterval(() => {
    i++;
    if (i >= themes.length) i = 0;
    setPageTheme(preset(themes[i]));
}, 1000);*/
