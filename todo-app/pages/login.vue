<template>
  <div class="login">
    <h2>Login</h2>
    <div>
      <form @submit.prevent="onSubmit">
        <div class="accounts">
          <h3>List of Accounts</h3>
          <div>
            <span v-for="(user, i) in users" :key="i">
              <img width="30" height="30" :src="user.avatar" alt="" />
              {{ user.name }}
            </span>
          </div>
        </div>
        <div>
          <label>User Name</label>
          <select v-model="form.username" required>
            <option value="">select_account...</option>
            <option
              v-for="(user, i) in users"
              :key="i"
              :value="user.username"
              style="
                background-image: url(https://robohash.org/zucker-ping.png);
              "
            >
              <div>
                <img width="35" height="35" :src="user.avatar" alt="" />
                {{ user.name }}
              </div>
            </option>
          </select>
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            v-model="form.password"
          />
        </div>

        <button type="submit">
          <span>Login</span>
        </button>
      </form>
      <br />
      <p v-if="msg" class="error-msg">{{ msg }}</p>
    </div>
  </div>
</template>

<script setup>
const url = "http://localhost:4000";
const users = ref([]);
const data = await $fetch(`${url}/users`);
users.value = data;

const msg = ref("");

const form = reactive({
  username: "",
  password: "",
});
async function onSubmit() {
  const user = await checkLoginData();
  if (user) {
    const auth = useAuth();
    auth.value.profile = { ...user, ...form };
    localStorage.setItem("USER", JSON.stringify({ ...user, ...form }));
    navigateTo("/");
  } else {
    msg.value = "Invalid Password";
    setTimeout(() => {
      msg.value = "";
    }, 3000);
  }
}
function checkLoginData() {
  return users.value.find(
    (user) =>
      user.username === form.username &&
      ((user.username === "zucker" && form.password === "123456") ||
        (user.username === "felon" && form.password === "123123") ||
        (user.username === "robon" && form.password === "secret"))
  );
}
useHead({
  title: "ToDo List - Login",
});
</script>

<style scoped>
.login {
  max-width: 450px;
  margin: 5% auto 0;
  padding: 3rem 0;
  width: 90%;
}
.login h2 {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form Style */
form input,
form button,
form select {
  margin-top: 8px;
  margin-bottom: 20px;
}
form button {
  background-color: #4070f4;
  border: 1px solid #4070f4;
  color: #1f2023;
  margin: auto;
  padding: 10px 60px;
}
/* Account List */
.accounts div {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10px;
}
.accounts div span {
  margin: 5px;
  display: flex;
  align-items: center;
}
.accounts div span img {
  border: 1px solid #eee;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
  padding: 4px;
}
</style>
