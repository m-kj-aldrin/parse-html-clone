import { ComChainElement } from "./custom-elements/chain";
import { ComModuleElement } from "./custom-elements/module";
import {
    MomentaryInputElement,
    RangeInputElement,
    SelectInputElement,
} from "./custom-elements/input/input";
import { ComNetworkElement } from "./custom-elements/network";
import { PthOperatorElement } from "./custom-elements/operators/pth";
import { LfoOperatorElement } from "./custom-elements/operators/lfo";

// interface TypedComModuleElement<T extends keyof OperatorTagNameMap>
//     extends ComModuleElement {
//     setOperatorParameters(
//         parameterValues: OperatorTagNameMap[T]['parameters'],
//         signalAll = false
//     ): TypedComModuleElement<T>;
// }

declare global {
    interface HTMLElementTagNameMap {
        "com-network": ComNetworkElement;
        "com-module": ComModuleElement<"pth">;
        "com-chain": ComChainElement;
        "com-op-pth": PthOperatorElement;
        "com-op-lfo": LfoOperatorElement;
        "input-range": RangeInputElement;
        "input-select": SelectInputElement;
        "input-momentary": MomentaryInputElement;
    }

    interface OperatorTagNameMap {
        pth: PthOperatorElement;
        lfo: LfoOperatorElement;
    }

    interface ExtendedQuerySelector {
        "input-range,input-select": RangeInputElement | SelectInputElement;
    }

    interface ParentNode {
        querySelectorAll<K extends keyof ExtendedQuerySelector>(
            selectors: K
        ): NodeListOf<ExtendedQuerySelector[K]>;
    }

    interface HTMLElementEventMap {
        input: InputEvent;
    }

    interface InputEvent {
        target: HTMLInputElement;
    }

    interface ShadowRoot {
        addEventListener<K extends keyof HTMLElementEventMap>(
            type: K,
            listener: (this: ShadowRoot, ev: HTMLElementEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions
        ): void;
    }
}
