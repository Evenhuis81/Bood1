import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./views/Main.vue";
import Table from "./views/Table.vue";
import Create from "./components/Create.vue";
const PageNotFound = { template: "<div>Page Not Found</div>" };

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: { name: "table" },
        component: Main,
        children: [
            {
                path: "table",
                name: "table",
                alias: "/",
                component: Table,
                children: [
                    {
                        path: "create",
                        name: "create",
                        component: Create
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        // alias: "*",
        component: PageNotFound
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
