import axiosInstance from "../http-common.js";

export default class DataService {
    getAll() {
        return axiosInstance.get('/').then(rs => {
            console.log(rs.data);
            localStorage.setItem("todoList", JSON.stringify(rs.data))
        }).catch(err => {
            console.error(err)
        });
    }

    getAllTaskDone() {
        return axiosInstance.get('/is-done').then(rs => {
            console.log(rs.data);
            localStorage.setItem("favList", JSON.stringify(rs.data))
        }).catch(err => {
            console.error(err)
        });
    }

    createNewTask(data) {
        return axiosInstance.post('/', data);
    }

    update(id, data) {
        return axiosInstance.put(`/${id}`, data);
    }

    //delete task
    delete(id) {
        return axiosInstance.delete(`/${id}`)
    }
}