# WebUI

Write declarative html in javascript

## Usage

### Hello World

```js
import { h1 } from "./webui.js";

document.body.append(h1("Hello World!").HTML);
```

You can find a lot of different html element functions (h1, span, p, input, ...) in the imported `WebUI module`.

### Other elements

If you don't find the element your are looking for (or for using custom html elements) try:

```js
import { element } from "./webui.js";

class MyElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerText = "Hello World!";
    }
}

window.customElements.define("my-element", MyElement);

document.body.append(element("my-element").HTML);

document.body.append(element("p", "^ My custom html element").HTML);
```

### Nest functions to build complex pages

To build more complex structures you can nest elements with a declarative syntax.

```js
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

                // do something...
            })
            .noDefault()
    ).HTML
);
```

### Dynamics

WebUI can rerender parts of the page when values need to be adopted. Therefore you can use the `dynamic()` element.

This element needs two parameters:

-   render: A function wich returns the updated element
-   dependencies: A function wich returns an array of `string`, `number` and `boolean` variables.

If a variable from the second parameter changes the render function from the first parameter is called and so the html page will be updated.

Example: "Click Counter"

```js
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
```

_NOTE:_ Dynamics only update after events. If a variable is changed outside an event you have to call `update()` manually.

To rerender all dynamics and ignore the dependencies use `forceUpdate`.

### Client Side Router

TODO

## Build

### Dependencies

-   tsc
-   rollup
-   rollup-plugin-dts

_NOTE_: npm can be used to download these dependencies and build the project automatically!

### Building

With npm installed:

```sh

npm i && npm build

```

The output files can be found in the `./dist/` folder with the names: `index.js` & `index.d.js`.

You may rename these files to `webui.(d).js` or move them to another folder where you would like to access them. The `<name>.d.js` file is only for typescript declarations to autocomplete your code.
