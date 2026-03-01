import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("@/views/DashBoard/DashBoard.vue"),
            redirect: { name: "cookie-manage" },
            children: [
                {
                    path: "cookie-manage",
                    name: "cookie-manage",
                    component: () => import("@/views/DashBoard/views/CookieManage.vue"),
                },
                {
                    path: "auto-report",
                    name: "auto-report",
                    component: () => import("@/views/DashBoard/views/AutoReport.vue"),
                },
                {
                    path: "image-detect",
                    name: "image-detect",
                    component: () => import("@/views/DashBoard/views/ImageDetect.vue"),
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login.vue"),
        },
    ],
});

export default router;
