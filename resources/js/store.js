import Vue from "vue";
import Vuex from "vuex";
import { componentsPlugin } from "bootstrap-vue";
// import modules from "./modules"

Vue.use(Vuex);

export default new Vuex.Store({
    // modules,
    state: {
        fields: [
            {
                key: "name",
                sortable: true,
                footTxt: "Total"
            },
            {
                key: "description"
            },
            {
                key: "price",
                sortable: true
            },
            {
                key: "amount"
            },
            {
                key: "subtotal",
                label: "SubTotal"
            },
            {
                key: "delete"
            }
        ],
        groceries: [],
    },
    mutations: {
        set_groceries(state, groceries) {
            state.groceries = groceries;
        }
    },
    actions: {
        groceries({ commit }) {
            return fetch("/api/groceries")
                .then(response => response.json())
                .then(data => {
                    data.forEach(dat => (dat.amount = dat.amount.toString()));
                    commit("set_groceries", data);
                    return data;
                });
        },
        persistTable({ }, payload) {
            fetch("/api/groceries", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
        },
        persistRow({ }, payload) {
            return fetch("api/groceries/add", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                redirect: "error",
                body: JSON.stringify(payload)
            }).then(response => {
                console.log()
                response.json()
            })
                .then(data => {
                    console.log('2nd then')
                    return data
                })
        }
    },
    getters: {
        getGroceries: state => state.groceries,
        getFields: state => state.fields
    }
});
