import {defineStore} from 'pinia'
import axiosInstance from "@/http-common";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [{
            id: null,
            title: null,
            done: null,
        }],
        favList: [{}],
        loading: false
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.done)
        },
        favCount() {
            if (this.tasks.length === 0) {
                return 0
            } else {
                return this.tasks?.reduce((p, c) => {
                    return c.done ? p + 1 : p
                }, 0)
            }
        }
        ,
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.loading = true
            // get data from json file using json server
            await axiosInstance.get('/').then(rs => {
                if (rs.data.length === 0) {
                    this.tasks = []
                    this.loading = false
                } else {
                    this.tasks = rs.data
                    this.loading = false
                }
            }).catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        async getFavTasks() {
            this.loading = true
            // get data from json file using json server
            await axiosInstance.get('/is-done').then(rs => {
                this.favList = rs.data
                this.loading = false
            }).catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        addTask(task) {
            // add data to json file using json server
            axiosInstance.post('/', task).then(rs => {
                this.loading = true
                console.log(rs)
                this.tasks.push(task)
                this.loading = false
            }).catch(err => {
                console.log(err)
            })
        },
        deleteTask(id) {
            axiosInstance.delete(`/${id}`).then(() => {
                this.tasks = this.tasks.filter(t => {
                    if (this.favList.find(f => f.id === id)) {
                        this.favList = this.favList.slice().filter(f => f.id !== id)
                    }
                    return t.id !== id
                })
            }).catch(err => {
                console.log(err)
            })
        },
        toggleFav(id) {
            //find id in tasks
            const task = this.tasks.find(t => t.id === id)
            //toggle done
            task.done = !task.done
            //update data to json file using json server
            axiosInstance.patch(`/${id}`).then(() => {
                this.favList = task.done ? [...this.favList, task] : this.favList.filter(t => t.id !== id)
            }).catch(err => {
                console.log(err)
            })
        }
    }
})