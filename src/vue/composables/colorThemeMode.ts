import {useDark, useToggle} from "@vueuse/core";
import {useRefSync} from "../utils/RefUtils";
import {Ref, ref} from "vue";
import {ColorThemeMode} from "../enums/ColorThemeMode";

const isDarkMode = useDark();

export const initializeColorThemeMode = () => {
};
export const toggleColorThemeMode = useToggle(isDarkMode);
export const colorThemeMode: Ref<ColorThemeMode> = ref(ColorThemeMode.Dark);
useRefSync(
    isDarkMode,
    colorThemeMode,
    (colorThemeMode, newIsDarkMode) => {
        colorThemeMode.value = newIsDarkMode ? ColorThemeMode.Dark : ColorThemeMode.Light;
    },
    (isDarkMode, newColorThemeMode) => {
        if (newColorThemeMode === ColorThemeMode.Dark) {
            isDarkMode.value = true;
        } else if (newColorThemeMode === ColorThemeMode.Light) {
            isDarkMode.value = false;
        } else {
            console.warn(`ColorThemeMode: Invalid color theme mode, ${newColorThemeMode}`);
        }
    }
);
