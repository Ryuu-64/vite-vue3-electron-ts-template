import {MulticastFunction} from "multicast-function";
import {initializeColorThemeMode} from "../composables";

export const afterAppInitialize: MulticastFunction<(...args: any) => any> = new MulticastFunction<(...args: any) => any>();

afterAppInitialize.add(initializeColorThemeMode);
