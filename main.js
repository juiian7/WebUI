import { button, div, h1, h2, span, p } from "./dist/index.js";

let counter = 0;
let counterLabel; //= span("Counter: 0");

let rootDiv = div(
    h1("Hoi!"),
    h2("Hoi2!"),

    span("Red text here :)").color("red"),

    p("This is a paragraph.").on("dblclick", () => alert("Hello Universe")),

    //counterLabel,
    (counterLabel = span("Counter: 0")),
    //ref('_refname',span(`Counter: ${counter}`)),

    button("Click me!")
        .on("click", () => {
            console.log(this); //TODO: Fix?

            counter++;
            counterLabel.textContent = "Counter: " + counter;

            update();
        })
        .color("#44DD44")
);

console.log(rootDiv);
console.log(rootDiv.HTML);

update();
function update() {
    document.body.innerHTML = "";
    document.body.append(rootDiv.HTML);
}
