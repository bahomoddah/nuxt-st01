export const useToDo = () => {
  const todos = ref([]);
  const newTask = ref("");

  
  const profile = JSON.parse(localStorage.getItem("USER") || "{}")

  const url = "http://localhost:4000";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    username: profile.username,
    password: profile.password,
    // Authorization: "Basic enVja2VyOjEyMzQ1Ng==",
    Authorization: "Basic ZmVsb246MTIzMTIz==",
    // Authorization: "Basic ",
  };

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
        fetchTodoList();
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
      fetchTodoList();
    });
  }
  function deleteTodo(id) {
    $fetch(`/todos/${id}`, {
      method: "DELETE",
      baseURL: url,
      headers,
    }).then(() => {
      fetchTodoList();
    });
  }
  function fetchTodoList() {
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
    fetchTodoList,
    addNewTask,
    markAsCompleted,
    deleteTodo,
  };
};
export const useAuth = () =>
  useState(() => ({
    isAuthenticated: false,
    profile: JSON.parse(localStorage.getItem("USER") || "{}")
  }));
