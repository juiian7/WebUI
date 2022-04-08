import { button, div, h1, h2, span, p, dynamic, input, form, list } from "./dist/index.js";

let counter = 0;

let todos = [];
let todo = "";

function addTodo() {
    todos = [...todos, todo];
    todo = "";
}
let todoComponent = div(
    h1("Todos"),
    dynamic(
        () =>
            form(
                input(todo)
                    .on("change", (e) => (todo = e.target.value))
                    .focus(),
                button("Add todo").type("submit")
            )
                .noDefault()
                .on("submit", addTodo),
        () => [todos]
    ),
    dynamic(
        () => list(todos.map((todo) => p(todo))),
        () => [todos]
    )
);

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

    button("Reset").on("click", () => window.confirm("You sure?") && (counter = 0)),
    todoComponent
);

document.body.append(rootDiv.HTML);
