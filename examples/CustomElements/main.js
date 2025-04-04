import { element, wrap } from "../../dist/index.js";

class MyElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerText = "Hello World!";
    }
}

window.customElements.define("my-element", MyElement);

wrap(document.body).append(element("my-element"));

wrap(document.body).append(element("p", "^ My custom html element"));
