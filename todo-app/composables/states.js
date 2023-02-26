export const useToDo = () => {
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

  return {
    todos,
    newTask,
    fetchList,
    addNewTask,
    markAsCompleted,
    removeTodo,
  };
};
export const useAuth = () =>
  useState(() => ({
    isAuthenticated: false,
    profile: JSON.parse(localStorage.getItem("USER") || "{}")
  }));
