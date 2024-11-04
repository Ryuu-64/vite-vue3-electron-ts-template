"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCounterStore = void 0;
var pinia_1 = require("pinia");
exports.useCounterStore = (0, pinia_1.defineStore)({
    id: 'counter',
    state: function () { return ({
        count: 0
    }); },
    actions: {
        increment: function () {
            this.count++;
        }
    }
});
