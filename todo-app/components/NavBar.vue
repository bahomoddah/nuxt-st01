<template>
  <nav>
    <nuxt-link to="/"> <h2>Dashboard</h2> </nuxt-link>
    <div v-if="user && !inlogin" class="profile">
      <span>{{ user.value ? user.value.name : '' }}</span>
      <img width="35" height="35" :src="user.value ? user.value.avatar : ''" alt="" />
      <button @click="logout" class="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute();
const user = reactive({});
const inlogin = computed(() => route.path.includes("login"));

if (!process.server) {
  user.value = JSON.parse(localStorage.getItem("USER") || "{}");
}
function logout() {
  localStorage.removeItem("USER");
  navigateTo("/login");
}
</script>
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #f7f7f7;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
}
nav h2 {
  color: #000;
}
.logout {
  font-size: 14px;
  padding: 7px 7px;
  border: none;
  margin: 0 7px;
  color: #fff;
  background-color: #dc4c64;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  border-radius: 6px;
}
.profile {
  display: flex;
  align-items: center;
}
.profile img {
  border: 1px solid #eee;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 5px;
  padding: 4px;
}
</style>
