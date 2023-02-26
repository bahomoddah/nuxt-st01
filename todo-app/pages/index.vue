<template>
  <div class="todo" v-if="user.id">
    <h1>ToDo List App</h1>
    <form @submit.prevent="addNewTask()">
      <div>
        <label>New Task </label>
        <input v-model="newTask" name="newTask" autocomplete="off" />
      </div>
      <button :disabled="!newTask" @click.prevent="addNewTask()">Add</button>
    </form>
    <div class="todo__list">
      <h2>My ToDo List</h2>
      <ul v-if="todos.length > 0">
        <li v-for="(todo, index) in todos" :key="index">
          <p :class="{ completed: todo.completed }">{{ todo.task }}</p>
          <div>
            <button @click="markAsCompleted(todo.id)">
              {{ todo.completed ? "UnDo" : "Done" }}
            </button>
            <button @click="removeTodo(todo.id)" class="delete">Delete</button>
          </div>
        </li>
      </ul>
      <h4 v-else>No Tasks, Have Fun ^_^</h4>
    </div>
  </div>
</template>

<script setup>
// check user is login
definePageMeta({
  middleware: ["auth"],
});

const auth = useAuth();
const user = computed(() => auth.value.profile);
!user.value.id ? navigateTo("/login") : "";

const { todos, newTask, fetchList, addNewTask, markAsCompleted, removeTodo } =
  useToDo();

useHead({
  title: "ToDo List App",
});
</script>

<style scoped>
.todo {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 0;
  width: 90%;
}
.todo h1 {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
}

/* Form Style */
form {
  margin-bottom: 30px;
}
form div {
  width: calc(100% - 61px);
}
form input {
  margin: 6px 8px 0 0;
}
</style>
