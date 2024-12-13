import {createWebHistory, createRouter, RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "redirect-bookmark",
        redirect: "/management-bookmark",
    },
    {
        path: "/management",
        name: "management",
        children: [
            {
                path: "/management-bookmark",
                name: "management-bookmark",
                component: () => import ( "../pages/management/Bookmark.vue"),
            },
            {
                path: "/management-category",
                name: "management-category",
                component: () => import ( "../pages/management/Category.vue"),
            },
        ]
    },
    {
        path: "/tree-view",
        name: "tree-view",
        component: () => import ( "../pages/TreeView.vue"),
    },
    {
        path: "/import",
        name: "import",
        component: () => import ( "../pages/Import.vue"),
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
