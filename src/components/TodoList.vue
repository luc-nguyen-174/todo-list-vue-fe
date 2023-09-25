<script setup>
import {todoStore} from "@/store/todoStore";
import {computed, onMounted} from "vue";
import DataService from "@/service/DataService";

const useStore = todoStore();

const service = new DataService();

const todoList = computed(() => {
    return useStore.todoList
})

onMounted(() => {
    service.getAll();
    useStore.getTodoList();
})
</script>

<template>
    <main>
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Completed</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in todoList" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
            </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>

</style>