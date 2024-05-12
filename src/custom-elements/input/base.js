const inputBaseTemplate = document.createElement("template");
inputBaseTemplate.innerHTML = `

`;

export class InputBaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.#name = this.getAttribute("name") ?? "";

        this.shadowRoot.append(inputBaseTemplate.content.cloneNode(true));
    }

    #name = "";
    get name() {
        return this.#name;
    }
    set name(name) {
        this.#name = name;
    }

    /**@type {string|number} */
    #value = 0;
    get value() {
        return this.#value;
    }
    set value(value) {
        this.#value = value;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
