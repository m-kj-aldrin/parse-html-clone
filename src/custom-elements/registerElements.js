import { ComChainElement } from "./chain.js";
import { SelectInputElement, RangeInputElement, MomentaryInputElement } from "./input/input.js";
import { ComModuleElement } from "./module.js";
import { ComNetworkElement } from "./network.js";
import { LfoOperatorElement } from "./operators/lfo.js";
import { PthOperatorElement } from "./operators/pth.js";

customElements.define("com-network", ComNetworkElement);
customElements.define("com-chain", ComChainElement);
customElements.define("com-module", ComModuleElement);

customElements.define("com-op-pth", PthOperatorElement);
customElements.define("com-op-lfo", LfoOperatorElement);

customElements.define("input-select", SelectInputElement);
customElements.define("input-range", RangeInputElement);
customElements.define("input-momentary", MomentaryInputElement);

