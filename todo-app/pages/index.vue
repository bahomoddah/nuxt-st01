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
</template>

<script setup>
const user = ref({});
definePageMeta({
  middleware: ["auth"],
});

if (!process.server) {
  user.value = JSON.parse(localStorage.getItem("USER") || "{}");
  if (!user.value.id) {
    navigateTo("/login");
  }
}
const url = "http://localhost:4000";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Basic enVja2VyOjEyMzQ1Ng==",
  auth: {
    username: "felon",
    password: "123123",
  },
};
const todos = ref([]);
const newTask = ref("");
fetchList();

function addNewTask() {
  if (newTask.value) {
    $fetch(`/todos`, {
      method: "POST",
      baseURL: url,
      params: {},
      body: {
        task: newTask.value,
      },
      headers,
    }).then(() => {
      fetchList();
    });
    newTask.value = "";
  }
}
function markAsCompleted(id) {
  $fetch(`/todos/${id}`, {
    method: "PUT",
    baseURL: url,
    headers,
  }).then(() => {
    fetchList();
  });
}
function removeTodo(id) {
  $fetch(`/todos/${id}`, {
    method: "DELETE",
    baseURL: url,
    headers,
  }).then(() => {
    fetchList();
  });
}
function fetchList() {
  $fetch(`/todos`, {
    method: "GET",
    baseURL: url,
    headers,
  }).then((data) => {
    todos.value = data;
  });
}
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
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
form div {
  display: flex;
  flex-direction: column;
  width: calc(100% - 61px);
}
form input,
form button {
  height: 48px;
  box-shadow: none;
  outline: none;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 6px;
  font-size: 18px;
}
form input {
  background-color: transparent;
  border: 1px solid #0e2431;
  color: inherit;
  margin: 6px 8px 0 0;
}
form button {
  cursor: pointer;
  background-color: #1f2023;
  border: 1px solid #1f2023;
  color: #fff;
  font-weight: bold;
  outline: none;
  border-radius: 6px;
}
form label {
  font-size: 14px;
  font-weight: bold;
}

/* List Style */
.todo h2 {
  font-size: 22px;
  padding-bottom: 6px;
}
.todo ul {
  padding: 15px 0;
}
.todo li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #0e2431;
  padding: 12px 5px;
  border-radius: 6px;
  margin-bottom: 12px;
}
.todo li p {
  cursor: pointer;
  word-break: break-all;
  padding: 0 12px;
}
.todo li .completed {
  text-decoration: line-through;
}
.todo li button {
  font-size: 12px;
  padding: 6px;
  border: none;
  margin: 0 7px;
  color: #fff;
  background-color: #14a44d;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  border-radius: 6px;
}
.todo li button.delete {
  background-color: #dc4c64;
}
.todo h4 {
  text-align: center;
  opacity: 0.5;
  margin: 15px 0;
  text-align: center;
}
</style>
