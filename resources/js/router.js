import Vue from "vue";
import VueRouter from "vue-router";
import Table from "./views/Table.vue";
import Create from "./components/Create.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/table",
        name: "home",
        component: Table,
        children: [
            {
                path: "create",
                component: Create
            }
        ]
    }
    // {
    //   path: '*', component: PageNotFound
    // },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
