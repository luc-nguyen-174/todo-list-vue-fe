import {defineStore} from "pinia";

export const todoStore = defineStore("todoStore",{
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