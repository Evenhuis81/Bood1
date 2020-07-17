import Vue from 'vue'
import Vuex from 'vuex'
// import modules from "./modules"

Vue.use(Vuex)

export default new Vuex.Store({
    // modules,
    state: {
        //
        groceries: []
    },
    mutations: {
        set_groceries(state, groceries) {
            state.groceries = groceries
        }
    },
    actions: {
        groceries({ commit }) {
            return fetch('/api/groceries')
                .then(response => response.json())
                .then(data => {
                    commit('set_groceries', data)
                    return data
                })
        },
        deleteGrocery({ }, id) {
            return fetch('/api/groceries', {
                method: 'PUT',
            })
        },
        // Default options are marked with *
        // fetch(url, {
        //     method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify(data) // body data type must match "Content-Type" header
        // });
        // return response.json(); // parses JSON response into native JavaScript objects
        // }

    },
    getters: {
        getGroceries: state => state.groceries
    }
})
