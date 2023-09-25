import axiosInstance from "../http-common.js";
export default class DataService {
    getAll() {
        return axiosInstance.get('/');
    }

    getAllTaskDone() {
        return axiosInstance.get('/is-done');
    }

    createNewTask(data) {
        return axiosInstance.post('/', data);
    }

    update(id, data) {
        return axiosInstance.put(`/${id}`, data);
    }

    //delete task
    delete(id) {
        return axiosInstance.delete('/{id}')
    }
}