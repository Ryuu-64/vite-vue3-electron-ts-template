"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleDarkMode = exports.isDarkMode = void 0;
var core_1 = require("@vueuse/core");
exports.isDarkMode = (0, core_1.useDark)();
exports.toggleDarkMode = (0, core_1.useToggle)(exports.isDarkMode);
