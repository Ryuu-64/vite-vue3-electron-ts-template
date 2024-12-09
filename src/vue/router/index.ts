import {createWebHistory, createRouter, RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/bookmark",
    },
    {
        path: "/management",
        name: "Management",
        children: [
            {
                path: "/bookmark",
                name: "Bookmark",
                component: () => import ( "../pages/management/Bookmark.vue"),
            },
            {
                path: "/category",
                name: "Category",
                component: () => import ( "../pages/management/Category.vue"),
            },
        ]
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
