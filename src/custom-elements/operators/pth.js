import { OperatorBaseElement } from "./base.js";

const pthOperatorTemplate = document.createElement("template");
pthOperatorTemplate.innerHTML = `
<div>pth</div>
`;

/**
 * @typedef {[]} PthParameters
 */

export class PthOperatorElement extends OperatorBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(pthOperatorTemplate.content.cloneNode(true));
    }

    /**@type {PthParameters} */
    get parameters() {
        return super.parameters;
    }
    set parameters(parameters) {
        super.parameters = parameters;
    }

    // connectedCallback() {}
    disconnectedCallback() {}
}
