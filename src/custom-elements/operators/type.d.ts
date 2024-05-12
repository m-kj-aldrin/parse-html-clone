import { LfoOperatorElement } from "./lfo";
import { PthOperatorElement } from "./pth";

interface OperatorTagNameMap {
    pth: PthOperatorElement;
    lfo: LfoOperatorElement;
}

type ModuleTypeNames = keyof OperatorTagNameMap;
type Operators = OperatorTagNameMap[ModuleTypeNames]
