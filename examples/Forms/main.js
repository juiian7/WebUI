import { div, element, form, h1, input, wrap } from "../../dist/index.js";

wrap(document.body).append(
    div(
        form(
            h1("User data"),
            div(element("label", "Name: ").attribute("name", "tbxName"), input().attribute("name", "tbxName").type("text").id("tbxName")),
            input("Submit").type("submit")
        )
            .class("userData")
            .on("submit", function (ev) {
                let name = ev.target.querySelector("#tbxName").value;

                alert(name);

                // do something...
            })
            .noDefault()
    )
);
