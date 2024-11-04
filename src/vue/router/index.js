"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var Home_vue_1 = require("../components/Home.vue");
var About_vue_1 = require("../components/About.vue");
var routes = [
    {
        path: "/",
        name: "",
        component: Home_vue_1.default,
    },
    {
        path: "/home",
        name: "Home",
        component: Home_vue_1.default,
    },
    {
        path: "/about",
        name: "About",
        component: About_vue_1.default,
    },
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes,
});
exports.default = router;
