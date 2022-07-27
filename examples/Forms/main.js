import { div, element, form, h1, input } from "../../dist/index.js";

document.body.append(
    div(
        form(
            h1("User data"),
            div(
                element("label", "Name: ").attribute("name", "tbxName"),
                input().attribute("name", "tbxName").type("text").id("tbxName")
            ),
            input("Submit").type("submit")
        )
            .class("userData")
            .on("submit", function (ev) {
                let name = ev.target.querySelector("#tbxName").value;

                // to sth.
            })
            .noDefault()
    ).HTML
);
