const ComBaseTemplate = document.createElement("template");
ComBaseTemplate.innerHTML = `
<style>
    .list-h,
    .list-v,
    :host(:where(com-network,com-chain,com-module)){
        display: flex;
        gap: var(--list-gap,4px);
    }

    .list-h{
        flex-direction: column;
    }

    .border,
    :host(:where(com-network,com-chain,com-module)){
        border: 1px currentColor solid;
    }

    .padding,
    :host(:where(com-network,com-chain,com-module)){
        padding: var(--padding,4px);
    }
</style>
`;

export class ComBaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(ComBaseTemplate.content.cloneNode(true));
    }

    get isAttached() {
        return false;
    }

    signal(type) {
        return this;
    }

    get index() {
        return 0;
    }

    /**@type {NodeListOf} */
    get comChildren() {
        return;
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
