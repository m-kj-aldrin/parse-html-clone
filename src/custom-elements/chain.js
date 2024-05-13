import { ComBaseElement } from "./base.js";
import { ComModuleElement } from "./module.js";
import { ComNetworkElement } from "./network.js";

const outerTemplate = document.createElement("template");
outerTemplate.innerHTML = `
<modules-list class="list-h">
    <slot></slot>
</modules-list>
`;

export class ComChainElement extends ComBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(outerTemplate.content.cloneNode(true));

        if (this.hasAttribute("signal")) {
            this.signal("new")
        }
    }

    /**@type {ComNetworkElement} */
    #network = null;

    get network() {
        return this.#network;
    }

    get isAttached() {
        return this.#network?.isAttached && this.#connectedToIntercom;
    }

    get comChildren() {
        return this.querySelectorAll("com-module");
    }

    /**@type {ComModuleElement} */
    get lastComChild() {
        return this.querySelector("com-module:last-child");
    }

    get index() {
        let i = 0;
        for (const sibling of this.network.comChildren) {
            if (sibling == this) {
                return i;
            }
            i++;
        }
        return -1;
    }

    /**
     * @template {Node} T
     * @param {T} node
     */
    appendChild(node) {
        if (this.lastComChild == node) {
            return node
        }
        super.appendChild(node);
        return node;
    }

    remove() {
        this.signal("remove");
        super.remove();
        return this;
    }

    /**@type {"new" | "edit" | "remove"} */
    #deferedSignal = null

    #connectedToIntercom = false

    // get connectedToIntercom

    /**
     * @param {"new" | "edit" | "remove"} type
     */
    signal(type) {
        if (!this.#network?.isAttached) {
            if (type != "remove") {
                this.#deferedSignal = type;
            }
            return this;
        }
        this.#deferedSignal = null;

        let signalString = "";

        switch (type) {
            case "new":
                signalString = `chain -n`;
                this.#connectedToIntercom = true
                this.comChildren.forEach(child => {
                    if (!child.isConnectedToIntercom) {
                        // child.signal("insert")
                    }
                })
                break;
            case "edit":
                if (!this.#connectedToIntercom) break
                signalString = `chain -e`;
                break;
            case "remove":
                signalString = `chain -r ${this.index}`;
                this.#connectedToIntercom = false
                break;
            default:
                return this;
        }

        if (signalString) {
            console.log(signalString);
        }

        return this;
    }

    connectedCallback() {
        let network = this.closest("com-network");
        if (network) {
            this.#network = network;
        }
        if (this.#deferedSignal) {
            this.signal(this.#deferedSignal);
        }
    }
    disconnectedCallback() {
        this.#network = null;
    }
}
