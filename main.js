import { button, div, hbox, vbox, h1, h2, span, p, dynamic, input, form, list, router, useRouter, update, link } from "./dist/index.js";

let counter = 0;
let mainPage = vbox(
    hbox(h1("Hoi!"), h2("Hoi2!")),
    span("Red text here :)").color("red").align("center"),

    p("This is a paragraph.").on("dblclick", () => alert("Hello Universe")),

    dynamic(
        () => p(`Counter: ${counter} `, counter % 2 === 0 && "is Even"),
        () => [counter]
    ),

    hbox(
        button("Click me!")
            .on("click", function () {
                console.log(this);
                this.color("blue");

                counter++;
            })
            .color("#44DD44"),

        button("Reset").on("click", () => window.confirm("You sure?") && (counter = 0))
    )
        .width("fit-content")
        .align("center"),

    div(button("Todo's").on("click", () => router().redirect("/todo"))),

    div(link('Own link: "/todo?items=apple,banana"', "/todo?items=apple,banana")),
    div(link("GitHub link", "https://github.com/juiian7/WebUI"))
)
    .width("clamp(460px, 100%, 860px)")
    .padding("auto");

let todos = [];
let todo = "";
function addTodo() {
    todos = [...todos, todo];
    todo = "";
}
let todoPage = div(
    link("<- Home", "/"),
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
        () => list(todos.map((todo) => div(link(todo, "/todo/" + todo + "/info?param1=test&hello=world")))),
        () => [todos]
    )
);

// setup router
useRouter().on("/", mainPage);

// access router
router()
    .on("/todo", (params) => {
        if (params["items"]) {
            params["items"].split(",").forEach((item) => {
                todo = item;
                addTodo();
            });
        }

        console.log(todos);
        update();
        return todoPage;
    })
    .on("/todo/:item/info", (params, vars) => {
        let e = div(h1(vars["item"]));

        for (const key in params) {
            e.append(p(key + ": " + params[key]));
        }

        e.append(link("<- back", "/todo/"));

        return e;
    })
    // redirect to active page
    .sync();
