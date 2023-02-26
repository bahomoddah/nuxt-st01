export const useToDo = () => {
  const todos = ref([]);
  const newTask = ref("");

  
  const auth = useAuth();
  const profile = computed(() => auth.value.profile);

  const url = "http://localhost:4000";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Basic enVja2VyOjEyMzQ1Ng==",
    auth: {
      username: profile.username,
      password: profile.password,
    },
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
