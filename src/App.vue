<template>
    <main>

        <!-- heading -->
        <header>
            <img src="./assets/logo.png" alt="logo">
            <h1>Todo List</h1>
        </header>

        <!-- new task form -->
        <div class="new-task-form">
            <TaskForm />
        </div>

        <!-- filter -->
        <nav class="filter">
            <button @click="filter = 'all'">All tasks</button>
            <button @click="filter = 'fav'">Fav tasks</button>
        </nav>

        <!-- loading -->
        <div class="loading" v-if="taskStore.loading">Loading tasks...</div>

        <!-- task list -->
        <div class="task-list" v-if="filter === 'all'">
            <p>You have {{ taskStore.totalCount }} tasks left to do.</p>
            <div v-for="task in taskStore.tasks" :key="task?.id">
                <TaskDetails :task="task" />
            </div>
        </div>

        <!-- fav list -->
        <div class="task-list" v-if="filter === 'fav'">
            <p>You have {{ taskStore.favCount }} tasks in your favs list.</p>
            <div v-for="task in taskStore.favList" :key="task?.id">
                <TaskDetails :task="task" />
            </div>
        </div>

    </main>
</template>

<script>
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'

import { useTaskStore } from './stores/TaskStore'
import { ref } from 'vue'

export default {
    components: { TaskDetails, TaskForm },
    setup() {
        const taskStore = useTaskStore()

        // fetch tasks
        taskStore.getTasks()
        taskStore.getFavTasks()

        const filter = ref('all')

        return { taskStore, filter }
    }
}
</script>