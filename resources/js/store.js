import Vue from "vue";
import Vuex from "vuex";
// import modules from "./modules"

Vue.use(Vuex);

export default new Vuex.Store({
    // modules,
    state: {
        //
        groceries: []
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
        persistTable({}, payload) {
            console.log(payload)
            fetch("/api/groceries", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload)
                })
            },
    },
    getters: {
        getGroceries: state => state.groceries
    }
});
