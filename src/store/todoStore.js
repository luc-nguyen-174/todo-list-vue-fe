import {defineStore} from "pinia";

export const todoStore = defineStore({
    state: () => ({
        todoList: [],
        favList: []
    }),
    getters: {

    },
    actions: {
        getTodoList() {
            this.todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        },

        getFavList() {
            this.favList = JSON.parse(localStorage.getItem('favList')) || [];
        }
    }
})