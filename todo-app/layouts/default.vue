<template>
  <div>
    <nav>
      <nuxt-link to="/"> <h2>Dashboard</h2> </nuxt-link>
      <div v-if="user.id && !inlogin" class="profile">
        <span>{{ user ? user.name : "" }}</span>
        <span v-if="user">
          <img width="35" height="35" :src="user.avatar" alt="" />
        </span>
        <button @click="logout" class="logout">Logout</button>
      </div>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup>
const auth = useAuth();
const user = computed(() => auth.value.profile);

// logout
const route = useRoute();
const inlogin = computed(() => route.path.includes("login"));
function logout() {
  localStorage.removeItem("USER");
  auth.value.profile = {};
  navigateTo("/login");
}
</script>

<style scoped>
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
