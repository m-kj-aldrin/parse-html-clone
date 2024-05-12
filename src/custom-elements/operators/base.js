import { InputBaseElement } from "../input/base.js";
import { ComModuleElement } from "../module.js";

const operatorBaseTemplate = document.createElement("template");
operatorBaseTemplate.innerHTML = ``;

export class OperatorBaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(operatorBaseTemplate.content.cloneNode(true));

        this.#setupListeners();
    }

    /**@type {ComModuleElement} */
    #module = null;

    #setupListeners() {
        this.shadowRoot.addEventListener("input", (e) => {
            this.signal(e.target);
        });
    }

    /**@param {InputBaseElement} input */
    signal(input) {
        if (!this.isAttached || !this.#module.isConnectedToIntercom) {
            return this;
        }
        let inputOrderAttr = input.getAttribute("order");
        if (/[0-9]/.test(inputOrderAttr)) {
            let cidx = this.#module.chain.index;
            let midx = this.#module.index;
            let pidx = +inputOrderAttr;
            let value = input.value;

            let signalString = `parameter -c ${cidx}:${midx} -v${pidx}:${value}`;

            console.log(signalString);
        }

        return this;
    }

    signalAll() {
        this.shadowRoot
            .querySelectorAll("input-range,input-select")
            .forEach((inp) =>
                inp.dispatchEvent(
                    new InputEvent("input", { bubbles: true, composed: true })
                )
            );
    }

    get isAttached() {
        return this.#module?.isAttached;
    }

    get inputs() {
        let inputElements = this.shadowRoot.querySelectorAll("input-range");
        return inputElements;
    }

    get parameters() {
        return [
            ...this.shadowRoot.querySelectorAll("input-range,input-select"),
        ].map((inp) => inp.value);
    }
    set parameters(parameters) {
        this.shadowRoot
            .querySelectorAll("input-range,input-select")
            .forEach((inp, i) => {
                let order = inp.getAttribute("order");
                let index = order ? +order : i;
                let newValue = parameters[index];
                if (newValue) {
                    inp.value = newValue;
                }
            });
    }

    connectedCallback() {
        let module = this.closest("com-module");
        if (module) {
            this.#module = module;
        }
    }
    disconnectedCallback() {
        this.#module = null;
    }
}
