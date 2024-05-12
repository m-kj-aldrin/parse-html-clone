import { OperatorBaseElement } from "./base.js";

const lfoOperatorTemplate = document.createElement("template");
lfoOperatorTemplate.innerHTML = `
<input-range value="20" name="frq" order="0"></input-range>
<input-range value="85" name="amp" order="1"></input-range>
`;

/**
 * @typedef {[number,number]} LfoParameters
 */

export class LfoOperatorElement extends OperatorBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(lfoOperatorTemplate.content.cloneNode(true));
    }

    /**@type {LfoParameters} */
    get parameters() {
        return super.parameters;
    }

    set parameters(parameters) {
        super.parameters = parameters;
    }

    // connectedCallback() {
    //     super.connectedCallback();
    // }
    disconnectedCallback() {}
}
