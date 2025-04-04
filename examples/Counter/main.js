import { button, div, dynamic, h1, p, wrap } from "../../dist/index.js";

let counter = 0;

wrap(document.body).append(
    div(
        h1("Clicker"),
        dynamic(
            () => p(`You clicked ${counter} times`),
            () => [counter]
        ),
        button("Click Me").on("click", function () {
            counter++;
        })
    )
);
