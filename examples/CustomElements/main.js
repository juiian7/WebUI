import { element } from "../../dist/index.js";

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
