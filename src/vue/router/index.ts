import {createWebHistory, createRouter, RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "bookmark",
        redirect: "/bookmark",
    },
    {
        path: "/management",
        name: "management",
        children: [
            {
                path: "/bookmark",
                name: "bookmark",
                component: () => import ( "../pages/management/Bookmark.vue"),
            },
            {
                path: "/category",
                name: "category",
                component: () => import ( "../pages/management/Category.vue"),
            },
        ]
    },
    {
        path: "/miscellaneous",
        name: "miscellaneous",
        component: () => import ( "../pages/Miscellaneous.vue"),
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import ( "../pages/Settings.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import ( "../pages/About.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
