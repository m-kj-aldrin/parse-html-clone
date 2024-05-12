import { ComBaseElement } from "./base.js";
import { ComChainElement } from "./chain.js";
import { SelectInputElement } from "./input/input.js";

const moduleTemplate = document.createElement("template");
moduleTemplate.innerHTML = `
<module-header>
    <input-momentary name="remove-module">remove</input-momentary>
</module-header>
<module-operator>
    <slot name="operator"></slot>
</module-operator>
`;

/**
 * @template {keyof OperatorTagNameMap} T
 */
export class ComModuleElement extends ComBaseElement {
    constructor() {
        super();

        this.shadowRoot.append(moduleTemplate.content.cloneNode(true));
        this.#operatorSelect = document.createElement("input-select");
        this.#operatorSelect.name = "operator-select";
        this.shadowRoot
            .querySelector("module-header")
            .prepend(this.#operatorSelect);

        this.#setupListeners();
    }

    /**@type {SelectInputElement} */
    #operatorSelect = null;

    /**@type {ComChainElement} */
    #chain = null;
    get chain() {
        return this.#chain;
    }
    get isAttached() {
        return this.#chain?.isAttached;
    }
    get index() {
        let i = 0;
        let connectedToIntercomChildren = [...this.chain.comChildren].filter(
            (m) => m.#connectedToIntercom
        );
        for (const sibling of connectedToIntercomChildren) {
            if (sibling == this) {
                return i;
            }
            i++;
        }
        return -1;
    }

    #setupListeners() {
        this.shadowRoot
            .querySelector("module-header")
            .addEventListener("input", (e) => {
                const name = e.target.name;
                switch (name) {
                    case "operator-select":
                        this.setOperatorType(e.target.value);
                        break;
                    case "remove-module":
                        this.remove();
                        break;
                }
            });
    }

    get signature() {
        let parametersString = this.#op.parameters.join(":");
        let signatureString = `${this.#type}${parametersString}`;
        return signatureString;
    }

    remove() {
        this.signal("remove");
        super.remove();
        return this;
    }

    /**@type {import("./operators/type.js").ModuleTypeNames} */
    #type = "pth";
    /**@type {import("./operators/type.js").Operators} */
    #op = null;

    #deferedType = true;

    /**
     * @template {import("./operators/type.js").ModuleTypeNames} T
     * @param {T} type
     * @returns {ComModuleElement<T>}
     */
    setOperatorType(type) {
        let oldType = this.#type;
        this.#type = type;

        if (this.isAttached) {
            const operator = document.createElement(`com-op-${this.#type}`);
            operator.slot = "operator";

            this.#op?.remove();

            this.#op = operator;

            this.appendChild(operator);

            this.#operatorSelect.value = type;

            // this.#deferedType = false;

            if (this.#connectedToIntercom) {
                if (oldType == type) {
                    return this;
                }

                this.signal("insert");
            } else if (!this.#deferedParameterValues.length) {
                this.signal("insert");
            }

            return this;
        }

        this.#deferedType = true;

        return this;
    }

    /**@type {number[]} */
    #deferedParameterValues = [];

    /**@param {OperatorTagNameMap[T]['parameters']} parameterValues */
    setOperatorParameters(parameterValues, signalAll = false) {
        if (!this.isAttached) {
            this.#deferedParameterValues = parameterValues;
            return this;
        }
        this.#op.parameters = parameterValues;

        if (signalAll) {
            this.#op.signalAll();
        }

        return this;
    }

    /**@type {"append"|"insert"|"remove"} */
    #deferedSignal = null;

    #connectedToIntercom = false;

    get isConnectedToIntercom() {
        return this.#connectedToIntercom;
    }

    /**@param {"append"|"insert"|"remove"} type */
    signal(type) {
        if (!this.isAttached) {
            if (type != "remove") {
                this.#deferedSignal = type;
            }
            return this;
        }
        this.#deferedSignal = null;

        let cidx = this.chain.index;
        let signalString = "";

        switch (type) {
            case "append":
                if (this.#connectedToIntercom) {
                    this.signal("remove");
                }

                this.chain.appendChild(this);

                this.#connectedToIntercom = true;
                signalString = `module -c ${cidx} -a ${this.signature}`;
                break;
            case "insert":
                if (this.#connectedToIntercom) {
                    this.signal("remove");
                }

                this.#connectedToIntercom = true;
                signalString = `module -c ${cidx} -i ${this.index} ${this.signature}`;
                break;
            case "remove":
                if (this.#connectedToIntercom) {
                    signalString = `module -c ${cidx} -r ${this.index}`;
                }
                // super.remove();
                this.#connectedToIntercom = false;
                break;
        }

        if (signalString) {
            console.log(signalString);
        }

        return this;
    }

    connectedCallback() {
        let chain = this.closest("com-chain");

        if (chain) {
            this.#chain = chain;
        }
        if (this.#deferedType) {
            this.setOperatorType(this.#type);
        }
        if (this.#deferedParameterValues.length) {
            this.setOperatorParameters(this.#deferedParameterValues, false);
        }
        if (this.#deferedSignal) {
            this.signal(this.#deferedSignal);
        }
    }
    disconnectedCallback() {
        this.#chain = null;
    }
}
