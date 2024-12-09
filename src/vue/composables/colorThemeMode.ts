import {useDark, useToggle} from "@vueuse/core";
import {useRefWrapper} from "../utils/RefUtils";

const isDarkMode = useDark();

export const initializeColorThemeMode = () => {
};
export const toggleColorThemeMode = useToggle(isDarkMode);
export const colorThemeMode = useRefWrapper(
    isDarkMode,
    (wrappedRef, _externalRef, newValue) => {
        wrappedRef.value = newValue;
    },
    (_wrappedRef, externalRef, newValue) => {
        externalRef.value = newValue;
    }
);
