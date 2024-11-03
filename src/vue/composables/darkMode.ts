import {useDark, useToggle} from "@vueuse/core";

export const isDarkMode = useDark();
export const toggleDarkMode = useToggle(isDarkMode);
