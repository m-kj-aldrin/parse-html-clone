import { ComBaseElement } from "./base.js";

const comNetworkTemplate = document.createElement("template");
comNetworkTemplate.innerHTML = `
<network-chains class="list-v">
    <slot></slot>
</network-chains>
`;

export class ComNetworkElement extends ComBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(comNetworkTemplate.content.cloneNode(true));
    }

    get isAttached() {
        return this.isConnected;
    }

    get comChildren() {
        return this.querySelectorAll("com-chain");
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
