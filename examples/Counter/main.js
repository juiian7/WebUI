import { button, div, dynamic, h1, p } from "../../dist/index.js";

let counter = 0;

document.body.append(
    div(
        h1("Clicker"),
        dynamic(
            () => p(`You clicked ${counter} times`),
            () => [counter]
        ),
        button("Click Me").on("click", function () {
            counter++;
        })
    ).HTML
);
