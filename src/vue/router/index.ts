import {createWebHistory, createRouter, RouteRecordRaw} from "vue-router";

/**
 * TODO add Management Node in RouteNode
 */
export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Bookmark",
        component: () => import ( "../pages/Bookmark.vue"),
    },
    {
        path: "/category",
        name: "Category",
        component: () => import ( "../pages/Category.vue"),
    },
    {
        path: "/miscellaneous",
        name: "Miscellaneous",
        component: () => import ( "../pages/Miscellaneous.vue"),
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import ( "../pages/Settings.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import ( "../pages/About.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
