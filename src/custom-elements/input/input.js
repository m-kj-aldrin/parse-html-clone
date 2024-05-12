import { InputBaseElement } from "./base.js";

const rangeInputTemplate = document.createElement("template");
rangeInputTemplate.innerHTML = `
<input type="range" />
`;

export class RangeInputElement extends InputBaseElement {
    constructor() {
        super();

        let valueAttr = this.getAttribute("value");

        this.shadowRoot.append(rangeInputTemplate.content.cloneNode(true));

        this.value = +valueAttr;

        this.#setupListeners();
    }

    #setupListeners() {
        this.shadowRoot.addEventListener("input", (e) => {
            this.value = +e.target.value;
        });
    }

    get value() {
        return super.value;
    }
    set value(value) {
        super.value = value;
        this.#updateSlider();
    }

    #updateSlider() {
        this.shadowRoot.querySelector("input").value = `${this.value}`;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}

const selectTemplate = document.createElement("template");
selectTemplate.innerHTML = `
<select>
    <option>pth</option>
    <option>lfo</option>
</select>
`;

export class SelectInputElement extends InputBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(selectTemplate.content.cloneNode(true));

        this.#setupListeners();
    }

    get value() {
        return super.value;
    }

    set value(value) {
        this.shadowRoot.querySelector("select").value = `${value}`;
        super.value = value;
    }

    #setupListeners() {
        this.shadowRoot.addEventListener("input", (e) => {
            this.value = e.target.value;
        });
    }

    connectedCallback() {}
    disconnectedCallback() {}
}

const inputMomentaryTemplate = document.createElement("template");
inputMomentaryTemplate.innerHTML = `
<slot></slot>
`;

export class MomentaryInputElement extends InputBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(inputMomentaryTemplate.content.cloneNode(true));

        this.#setupListeners();
    }

    #setupListeners() {
        this.addEventListener("pointerup", (e) => {
            this.dispatchEvent(
                new InputEvent("input", { bubbles: true, composed: true })
            );
        });
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
